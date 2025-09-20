import { Loader } from "@/components/loader";
import { useGetWorkspaceQuery } from "@/hooks/use-workspace";
import { WrokspaceHeader } from "@/components/workspace/workspace-header";
import type { Workspace, Project } from "@/types";
import { useState } from "react";
import { useParams } from "react-router";
import { ProjectList } from "@/components/workspace/project-list";

const WorkspaceDetails = () => {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [isCreateProject, setIsCreateProject] = useState(false);
  const [isInviteMember, setIsInviteMember] = useState(false);

  if (!workspaceId) {
    return <div>No workspace found</div>;
  }

  const { data, isLoading } = useGetWorkspaceQuery(workspaceId) as {
    data: {
      projects: any;
      workspace: Workspace;
      project: Project[];
    };
    isLoading: boolean;
  };

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <WrokspaceHeader
        workspace={data.workspace}
        members={data?.workspace.members as any}
        onCreateProject={() => setIsCreateProject(true)}
        onInviteMember={() => setIsInviteMember(true)}
      />

      <ProjectList
        workspaceId={workspaceId}
        projects= {data.projects}
        onCreateProject={() => setIsCreateProject(true)}
      />
    </div>
  );
};

export default WorkspaceDetails;
