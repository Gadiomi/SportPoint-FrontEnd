import EditGeneral from '../EditGeneral/EditGeneral';

const ContentComponent = ({ content }: { content: any }) => {
  console.log(content.route);
  switch (content.route.toLowerCase()) {
    case 'general':
      return <EditGeneral />;
    // case 'change-password':
    //   return <EditPassword />;
    default:
      return <div>{`Content for ${content.name}`}</div>;
  }
};

export default ContentComponent;
