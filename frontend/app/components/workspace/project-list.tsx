import type { Project } from "@/types";
import { NoDataFound } from "../no-data-found";
import { ProjectCard } from "../project/project-card";

interface ProjectListProps {
  workspaceId: string;
  projects: Project[];
  onCreateProject: () => void;
}

export const ProjectList = ({
  workspaceId,
  projects,
  onCreateProject,
}: ProjectListProps) => {
  return (
    <div className="text-xl font-medium mb-4">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.length === 0 ? (
          <NoDataFound
            title="No Project found"
            description="Create a project to get started"
            buttonText="Create Text"
            buttonAction={onCreateProject}
          />
        ) : (
          projects.map((project) => {
            const projectProgress = 0;
            return (
              <ProjectCard
                key={project._id}
                project={project}
                progress={projectProgress}
                workspaceId={workspaceId}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
