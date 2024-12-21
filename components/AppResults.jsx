"use client";
import data from "../public/applications.json";

import { Card, CardBody, CardFooter, Heading } from "grommet";
import Link from "next/link";

export default function AppResults(props) {
  const apps = data.filter((app) => {
    return app.pageName === props.pageName;
  })[0].applications;

  return (
    <div className="flex flex-wrap justify-start">
      {apps.map((app, appIndex) => (
        <div key={`app-${app.name}-${appIndex}`} className="m-4">
          <Link href={`${app.link}`}>
            <Card
              className="xl:w-64 xl:h-72 lg:w-52 lg:h-52 w-44 h-44 hover:scale-105 transition-all duration-100 ease-in-out"
              elevation="medium"
              level={2}
              background="#ffffff"
            >
              <CardBody
                pad="none"
                background={{ image: `url(${app.image})`, size: "contain" }}
                className="bg-repeat"
              ></CardBody>
              <CardFooter pad={{ horizontal: "small" }}>
                <Heading level={2} margin="small">
                  {app.name}
                </Heading>
              </CardFooter>
            </Card>
          </Link>
        </div>
      ))}
    </div>
  );
}
