import { Container, Section } from '@/components/ContainerAndSection';
import { Icon, IconName } from '@/kit';
import { IconBlock, IconList } from './styles';

const HelperPage = () => {
  const iconNameList = Object.keys(IconName);
  const iconValuesList = Object.values(IconName);
  console.log(' iconNameList -> ', iconNameList);
  return (
    <Section>
      {/* ??? */}
      <Container maxWidth="1440px">
        <h1>Helper page</h1>
        <h2>Icons</h2>
        <IconList>
          {iconValuesList.map(item => (
            <IconBlock>
              <Icon
                styles={{
                  color: 'currentColor',
                  fill: 'transparent',
                }}
                name={item}
                // name={IconName.ARROW_LEFT}
              />
              <p>
                <span>name</span>: {item}
              </p>
            </IconBlock>
          ))}
        </IconList>
      </Container>
    </Section>
  );
};

export default HelperPage;
