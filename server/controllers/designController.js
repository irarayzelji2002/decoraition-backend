const { db } = require("../firebaseConfig");

// Create
exports.handleCreateDesign = async (req, res) => {
  try {
    const { userId, designName, projectId } = req.body;
    const designRef = db.collection("designs").doc();
    const designData = {
      designName,
      userId,
      projectId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await designRef.set(designData);
    res.status(201).json({ id: designRef.id, ...designData });
  } catch (error) {
    console.error("Error creating design:", error);
    res.status(500).json({ error: "Failed to create design" });
  }
};

// Read
exports.fetchDesigns = async (req, res) => {
  try {
    const { userId } = req.params;
    const designsSnapshot = await db
      .collection("designs")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();
    const designs = designsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(designs);
  } catch (error) {
    console.error("Error fetching designs:", error);
    res.status(500).json({ error: "Failed to fetch designs" });
  }
};

// Update
exports.updateDesign = async (req, res) => {
  try {
    const { designId } = req.params;
    const updateData = req.body;
    updateData.updatedAt = new Date();
    await db.collection("designs").doc(designId).update(updateData);
    res.json({ message: "Design updated successfully" });
  } catch (error) {
    console.error("Error updating design:", error);
    res.status(500).json({ error: "Failed to update design" });
  }
};

// Delete
exports.handleDeleteDesign = async (req, res) => {
  try {
    const { designId } = req.params;
    await db.collection("designs").doc(designId).delete();
    res.json({ message: "Design deleted successfully" });
  } catch (error) {
    console.error("Error deleting design:", error);
    res.status(500).json({ error: "Failed to delete design" });
  }
};
