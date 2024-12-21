// ContainerDrivenLayout.js
"use client";
import { Card, Page, PageHeader } from "grommet";
import AppResults from "./AppResults";
import allApps from "../public/applications.json";
import { CustomHeader } from "./CustomHeader";

export default function Dashboard() {
  return (
    <div className="bg-[#f7f7f7]">
      <div className="px-10 pb-10 bg-[#f7f7f7] xl:w-[70%] w-[97%] mx-auto">
        <CustomHeader />
        <div className="">
          <Page kind="wide">
            <PageHeader title="Applications" />
            {allApps.map((data) => (
              <Card
                elevation="none"
                key={data.pageName}
                pad={{
                  top: "none",
                  horizontal: "large",
                  bottom: "large",
                }}
                margin={{ bottom: "large" }}
              >
                <div key={data.pageName}>
                  <PageHeader title={data.label} />
                  <AppResults pageName={data.pageName} />
                </div>
              </Card>
            ))}
          </Page>
        </div>
      </div>
    </div>
  );
}
