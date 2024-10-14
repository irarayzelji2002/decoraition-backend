const { db } = require("../firebaseConfig");

// Create
exports.handleCreateProject = async (req, res) => {
  try {
    const { userId, projectName } = req.body;
    const projectRef = db.collection("projects").doc();
    const projectData = {
      projectName,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await projectRef.set(projectData);
    res.status(201).json({ id: projectRef.id, ...projectData });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
};

// Read
exports.fetchProjects = async (req, res) => {
  try {
    const { userId } = req.params;
    const projectsSnapshot = await db
      .collection("projects")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();
    const projects = projectsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

// Update
exports.updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const updateData = req.body;
    updateData.updatedAt = new Date();
    await db.collection("projects").doc(projectId).update(updateData);
    res.json({ message: "Project updated successfully" });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Failed to update project" });
  }
};

// Delete
exports.handleDeleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    await db.collection("projects").doc(projectId).delete();
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Failed to delete project" });
  }
};
