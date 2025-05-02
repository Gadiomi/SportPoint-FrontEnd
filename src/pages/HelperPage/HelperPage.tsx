import { Container, Section } from '@/components/ContainerAndSection';
import { Icon, IconName } from '@/kit';
import { IconBlock, IconList } from './styles';

const HelperPage = () => {
  const iconNameList = Object.entries(IconName);
  // console.log(' iconNameList -> ', iconNameList);
  return (
    <Section>
      {/* ??? */}
      <Container maxWidth="1440px">
        <h1>Helper page</h1>
        <h2>Icons {`(name={IconName. ...)`}</h2>
        <IconList>
          {iconNameList.map(item => (
            <IconBlock>
              <Icon
                styles={{
                  color: 'currentColor',
                  fill: 'transparent',
                }}
                name={item[1]}
              />
              <p>{item[0]}</p>
              <p>'{item[1]}'</p>
            </IconBlock>
          ))}
        </IconList>
      </Container>
    </Section>
  );
};

export default HelperPage;
