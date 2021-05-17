import {Htag, Button, P, Tag} from "../components";

export default function Home(): JSX.Element {
  return (
    <div>
      <Htag tag="h1">Text h1</Htag>
      <Htag tag="h2">Text h1</Htag>
      <Htag tag="h3">Text h1</Htag>
      <Button appearance="primary" arrow="right">sdfsdfsdf</Button>
      <Button appearance="ghost" arrow="right">sdfsdfsdf</Button>
      <P>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos est et explicabo, incidunt itaque officiis repellat ut? Animi, eaque tempora?
      </P>
      <P size="m">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos est et explicabo, incidunt itaque officiis repellat ut? Animi, eaque tempora?
      </P>
      <P size="s">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos est et explicabo, incidunt itaque officiis repellat ut? Animi, eaque tempora?
      </P>
      <P size="l">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos est et explicabo, incidunt itaque officiis repellat ut? Animi, eaque tempora?
      </P>
      <Tag size="s">Goast</Tag>
      <Tag size="m" color="red">red</Tag>
      <Tag size="s" color="green">green</Tag>
      <Tag size="s" color="red">red</Tag>
      <Tag size="s" color="primary">primary</Tag>
      <Tag color="primary">primary</Tag>
      <Tag size="m" color="primary">primary</Tag>
      <Tag color="grey">primary</Tag>
    </div>
  );
}
