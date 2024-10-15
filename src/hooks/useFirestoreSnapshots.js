import { useState, useEffect } from "react";
import { initializeApp as initializeClientApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  documentId,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
const clientApp = initializeClientApp(firebaseConfig);
const auth = getAuth(clientApp);
const db = getFirestore(clientApp);

const useFirestoreSnapshots = (collections, stateSetterFunctions) => {
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const [isCollectionLoaded, setIsCollectionLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Effect for general collections
  useEffect(() => {
    const generalCollections = [
      "users",
      "projects",
      "designs",
      "designVersions",
      "comments",
      "notifications",
      "projectBudgets",
      "budgets",
      "items",
      "planMaps",
      "pins",
      "timelines",
      "events",
    ];
    const unsubscribeCallbacks = [];

    collections.forEach((collectionName) => {
      if (!generalCollections.includes(collectionName)) {
        console.warn(`Warning: ${collectionName} is not a general collection.`);
        return;
      }

      const collectionRef = collection(db, collectionName);

      const unsubscribe = onSnapshot(
        collectionRef,
        (querySnapshot) => {
          const stateSetter = stateSetterFunctions[collectionName];
          if (stateSetter) {
            const updatedData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            stateSetter(updatedData);
            console.log(`State updated for collection: ${collectionName}`);
          } else {
            console.error(`No state setter found for collection: ${collectionName}`);
          }
        },
        (error) => {
          console.error(`Error in snapshot listener for ${collectionName}:`, error);
        }
      );

      unsubscribeCallbacks.push(unsubscribe);
    });

    setIsCollectionLoaded(true);

    return () => {
      unsubscribeCallbacks.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  // Effect for user-related data
  useEffect(() => {
    console.log("inside 2nd useEffect");
    const userRelatedCollections = [
      "userProjects",
      "userDesigns",
      "userDesignVersions",
      "userDesignsComments",
      "userComments",
      "userNotifications",
      "userProjectBudgets",
      "userBudgets",
      "userItems",
      "userPlanMaps",
      "userPins",
      "userTimelines",
      "userEvents",
    ];
    const user = auth.currentUser;
    if (!user) {
      setIsUserDataLoaded(false);
      return;
    }

    const unsubscribers = [];

    const setupListener = (collectionName, query) => {
      if (!userRelatedCollections.includes(collectionName)) {
        console.warn(`Warning: ${collectionName} is not a user-related collection`);
        return;
      }
      const unsubscribe = onSnapshot(query, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        stateSetterFunctions[collectionName](data);
        console.log(`State updated for collection: ${collectionName}`);
      });
      unsubscribers.push(unsubscribe);
    };

    const fetchData = async () => {
      try {
        const { projectsSnapshot, data: projectsData } = await fetchUserProjects(user);
        stateSetterFunctions.userProjects(projectsData);
        setupListener(
          "userProjects",
          query(
            collection(db, "projects"),
            where(
              documentId(),
              "in",
              projectsData.map((p) => p.id)
            )
          )
        );

        const { designsSnapshot, data: designsData } = await fetchUserDesigns(user);
        stateSetterFunctions.userDesigns(designsData);
        setupListener(
          "userDesigns",
          query(
            collection(db, "designs"),
            where(
              documentId(),
              "in",
              designsData.map((d) => d.id)
            )
          )
        );

        const { designVersionsSnapshot, data: designVersionsData } = await fetchUserDesignVersions(
          designsSnapshot
        );
        stateSetterFunctions.userDesignVersions(designVersionsData);
        setupListener(
          "userDesignVersions",
          query(
            collection(db, "designVersions"),
            where(
              documentId(),
              "in",
              designVersionsData.map((dv) => dv.id)
            )
          )
        );

        const { data: designsCommentsData } = await fetchUserDesignsComments(
          designVersionsSnapshot
        );
        stateSetterFunctions.userDesignsComments(designsCommentsData);
        setupListener(
          "userDesignsComments",
          query(
            collection(db, "comments"),
            where(
              "designVersionImageId",
              "in",
              designVersionsData.flatMap((dv) => dv.images.map((img) => img.imageId))
            )
          )
        );

        const { data: userCommentsData } = await fetchUserComments(user);
        stateSetterFunctions.userComments(userCommentsData);
        setupListener(
          "userComments",
          query(collection(db, "comments"), where("userId", "==", user.uid))
        );

        const { data: notificationsData } = await fetchUserNotifications(user);
        stateSetterFunctions.userNotifications(notificationsData);
        setupListener(
          "userNotifications",
          query(collection(db, "notifications"), where("userId", "==", user.uid))
        );

        const { projectBudgetsSnapshot, data: projectBudgetsData } = await fetchUserProjectBudgets(
          projectsSnapshot
        );
        stateSetterFunctions.userProjectBudgets(projectBudgetsData);
        setupListener(
          "userProjectBudgets",
          query(
            collection(db, "projectBudgets"),
            where(
              documentId(),
              "in",
              projectBudgetsData.map((pb) => pb.id)
            )
          )
        );

        const { budgetsSnapshot, data: budgetsData } = await fetchUserBudgets(
          projectBudgetsSnapshot,
          designsSnapshot
        );
        stateSetterFunctions.userBudgets(budgetsData);
        setupListener(
          "userBudgets",
          query(
            collection(db, "budgets"),
            where(
              documentId(),
              "in",
              budgetsData.map((b) => b.id)
            )
          )
        );

        const { data: itemsData } = await fetchUserItems(budgetsSnapshot);
        stateSetterFunctions.userItems(itemsData);
        setupListener(
          "userItems",
          query(
            collection(db, "items"),
            where(
              documentId(),
              "in",
              itemsData.map((i) => i.id)
            )
          )
        );

        const { planMapsSnapshot, data: planMapsData } = await fetchUserPlanMaps(projectsSnapshot);
        stateSetterFunctions.userPlanMaps(planMapsData);
        setupListener(
          "userPlanMaps",
          query(
            collection(db, "planMaps"),
            where(
              documentId(),
              "in",
              planMapsData.map((pm) => pm.id)
            )
          )
        );

        const { data: pinsData } = await fetchUserPins(planMapsSnapshot);
        stateSetterFunctions.userPins(pinsData);
        setupListener(
          "userPins",
          query(
            collection(db, "pins"),
            where(
              documentId(),
              "in",
              pinsData.map((p) => p.id)
            )
          )
        );

        const { timelinesSnapshot, data: timelinesData } = await fetchUserTimelines(
          projectsSnapshot
        );
        stateSetterFunctions.userTimelines(timelinesData);
        setupListener(
          "userTimelines",
          query(
            collection(db, "timelines"),
            where(
              documentId(),
              "in",
              timelinesData.map((t) => t.id)
            )
          )
        );

        const { data: eventsData } = await fetchUserEvents(timelinesSnapshot);
        stateSetterFunctions.userEvents(eventsData);
        setupListener(
          "userEvents",
          query(
            collection(db, "events"),
            where(
              documentId(),
              "in",
              eventsData.map((e) => e.id)
            )
          )
        );

        setIsUserDataLoaded(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsUserDataLoaded(false);
      }
    };

    fetchData();

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  // Effect to update isLoaded state
  useEffect(() => {
    setIsLoaded(isUserDataLoaded && isCollectionLoaded);
  }, [isUserDataLoaded, isCollectionLoaded]);

  return isLoaded;
};

const fetchUserProjects = async (user) => {
  //get all projects with user's document in users collection projects field projects: [{projectId: string, role: int}]
  const userDoc = await getDoc(doc(db, "users", user.uid));
  const projectIds = userDoc.data().projects.map((p) => p.projectId);
  const projectsSnapshot = await getDocs(
    query(collection(db, "projects"), where(documentId(), "in", projectIds))
  );
  const data = projectsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return { projectsSnapshot, data };
};

const fetchUserDesigns = async (user) => {
  //get all designs with user's document in users collection designs field designs: [{designId: string, role: int}]
  const userDocDesigns = await getDoc(doc(db, "users", user.uid));
  const designIds = userDocDesigns.data().designs.map((d) => d.designId);
  const designsSnapshot = await getDocs(
    query(collection(db, "designs"), where(documentId(), "in", designIds))
  );
  const data = designsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return { designsSnapshot, data };
};

const fetchUserDesignVersions = async (designsSnapshot) => {
  //get all designVersions of userDesigns through the history field history: array of designVersionIds in designs collection
  const designVersionIds = designsSnapshot.docs.flatMap((doc) => doc.data().history);
  const designVersionsSnapshot = await getDocs(
    query(collection(db, "designVersions"), where(documentId(), "in", designVersionIds))
  );
  const data = designVersionsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return { designVersionsSnapshot, data };
};

const fetchUserDesignsComments = async (designVersionsSnapshot) => {
  //get all comments in userDesigns, meaning designVersionImageId of comments collection is in userDesignVersions
  const imageIds = designVersionsSnapshot.docs.flatMap((doc) =>
    doc.data().images.map((img) => img.imageId)
  );
  const commentsSnapshot = await getDocs(
    query(collection(db, "comments"), where("designVersionImageId", "in", imageIds))
  );
  const data = commentsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return { commentsSnapshot, data };
};

const fetchUserComments = async (user) => {
  //get all user's comments in comments collection where userId = user's id
  const userCommentsSnapshot = await getDocs(
    query(collection(db, "comments"), where("userId", "==", user.uid))
  );
  const data = userCommentsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return { userCommentsSnapshot, data };
};

const fetchUserNotifications = async (user) => {
  //get all notifications where userId = user's id
  const userNotificationsSnapshot = await getDocs(
    query(collection(db, "notifications"), where("userId", "==", user.uid))
  );
  const data = userNotificationsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return { userNotificationsSnapshot, data };
};

const fetchUserProjectBudgets = async (projectsSnapshot) => {
  //get all user-related project budget by matching userProjects's project's projectBudgetId field in the projectBudget collection
  const projectBudgetIds = projectsSnapshot.docs.map((doc) => doc.data().projectBudgetId);
  const projectBudgetsSnapshot = await getDocs(
    query(collection(db, "projectBudgets"), where(documentId(), "in", projectBudgetIds))
  );
  const data = projectBudgetsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return { projectBudgetsSnapshot, data };
};

const fetchUserBudgets = async (projectBudgetsSnapshot, designsSnapshot) => {
  //get all user-related budgets from the budgets array field of userProjectBudgets's documents AND also from the budgetId field of userDesigns's documents in the budgets collection
  // From project budgets
  const budgetIdsFromProjects = projectBudgetsSnapshot.docs.flatMap((doc) => doc.data().budgets);
  // From designs
  const budgetIdsFromDesigns = designsSnapshot.docs.map((doc) => doc.data().budgetId);
  // Combine
  const allBudgetIds = [...new Set([...budgetIdsFromProjects, ...budgetIdsFromDesigns])];
  const budgetsSnapshot = await getDocs(
    query(collection(db, "budgets"), where(documentId(), "in", allBudgetIds))
  );
  const data = budgetsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return { budgetsSnapshot, data };
};

const fetchUserItems = async (budgetsSnapshot) => {
  //get all user-related items from the items array field of userBudgets's documents in the items collection
  const itemIds = budgetsSnapshot.docs.flatMap((doc) => doc.data().items);
  const itemsSnapshot = await getDocs(
    query(collection(db, "items"), where(documentId(), "in", itemIds))
  );
  const data = itemsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return { itemsSnapshot, data };
};

const fetchUserPlanMaps = async (projectsSnapshot) => {
  //get all user-related plan maps by matching userProjects's project's planMapId field in the planMaps collection
  const planMapIds = projectsSnapshot.docs.map((doc) => doc.data().planMapId);
  const planMapsSnapshot = await getDocs(
    query(collection(db, "planMaps"), where(documentId(), "in", planMapIds))
  );
  const data = planMapsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return { planMapsSnapshot, data };
};

const fetchUserPins = async (planMapsSnapshot) => {
  //get all pins from the pins array field of userPlanMaps's documents in the pins collection
  const pinIds = planMapsSnapshot.docs.flatMap((doc) => doc.data().pins);
  const pinsSnapshot = await getDocs(
    query(collection(db, "pins"), where(documentId(), "in", pinIds))
  );
  const data = pinsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return { pinsSnapshot, data };
};

const fetchUserTimelines = async (projectsSnapshot) => {
  //get all user-related timeline by matching userProjects's project's timelineId field in timelines collection
  const timelineIds = projectsSnapshot.docs.map((doc) => doc.data().timelineId);
  const timelinesSnapshot = await getDocs(
    query(collection(db, "timelines"), where(documentId(), "in", timelineIds))
  );
  const data = timelinesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return { timelinesSnapshot, data };
};

const fetchUserEvents = async (timelinesSnapshot) => {
  //get all user-related events from the events array field of userTimelines's documents in the events collection
  const eventIds = timelinesSnapshot.docs.flatMap((doc) => doc.data().events);
  const eventsSnapshot = await getDocs(
    query(collection(db, "events"), where(documentId(), "in", eventIds))
  );
  const data = eventsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return { eventsSnapshot, data };
};

export default useFirestoreSnapshots;
