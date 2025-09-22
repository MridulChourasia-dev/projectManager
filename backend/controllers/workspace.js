import Workspace from "../models/workspace.js";
import Project from "../models/project.js";

const createWorkspace = async (req, res) => {
  try {
    const { name, description, color } = req.body;

    const workspace = await Workspace.create({
      name,
      description,
      color,
      owner: req.user._id,
      members: [
        {
          user: req.user._id,
          role: "owner",
          joinedAt: new Date(),
        },
      ],
    });

    return res.status(201).json({
      workspace,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find({
      "members.user": req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json(workspaces);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getWorkspaceDetails = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const workspace = await Workspace.findById(workspaceId).populate(
      "members.user",
      "name email avatar"
    );

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    return res.status(200).json({
      workspace,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getWorkspaceProjects = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const workspace = await Workspace.findOne({
      _id: workspaceId,
      "members.user": req.user._id,
    }).populate("members.user", "name email profilePicture");

    if (!workspace) {
      return res
        .status(404)
        .json({ message: "Workspace not found or access denied" });
    }

    const projects = await Project.find({
      workspace: workspaceId,
      isArchived: false,
      // members: { $in: [req.user._id] },
    })
      // .populate("task", "status")
      .sort({ createdAt: -1 });

    return res.status(200).json({ projects, workspace });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
  createWorkspace,
  getWorkspaces,
  getWorkspaceDetails,
  getWorkspaceProjects,
};
