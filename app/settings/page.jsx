"use client";
import { CustomHeader } from "@/components/CustomHeader";
import {
  Box,
  Button,
  Card,
  FileInput,
  Form,
  FormField,
  Heading,
  Layer,
  Page,
  PageHeader,
  Paragraph,
  TextInput,
} from "grommet";
import { Trash } from "grommet-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import allApps from "../../public/applications.json";

export default function Settings() {
  const [applications, setApplications] = useState(allApps);
  const inputRefs = useRef([]);
  const [currentFocus, setCurrentFocus] = useState(null);
  const [files, setFiles] = useState([]);
  const [busyUploadButton, setBusyUploadButton] = useState([]);

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload-file", {
      method: "POST",
      body: formData,
    });
    const body = await res.json();

    if (res.status === 200) {
      return body.filename;
    }
    return null;
  };

  const handleAddApplication = (pageIndex) => {
    const newApp = {
      name: "",
      image: "",
      link: "",
      description: "",
      image: "",
    };
    const updatedApplications = [...applications];
    updatedApplications[pageIndex].applications.push(newApp);
    setApplications(updatedApplications);
  };

  const handleRemoveApplication = (pageIndex, appIndex) => {
    const updatedApplications = [...applications];
    updatedApplications[pageIndex].applications.splice(appIndex, 1);
    setApplications(updatedApplications);
  };

  const handleSave = () => {
    console.log(JSON.stringify(applications, null, 2));
    fetch("/api/save-applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applications),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    console.log(applications);
  }, [applications]);

  useEffect(() => {
    if (currentFocus) {
      inputRefs.current[currentFocus].focus();
    }
  });

  const handleFormChange = (nextValue, pageIndex, appIndex) => {
    const newApplications = [...applications];
    newApplications[pageIndex].applications[appIndex] = nextValue;
    setApplications(newApplications);
  };

  return (
    <div className="bg-[#f7f7f7]">
      <div className="px-10 pb-10 bg-[#f7f7f7] xl:w-[70%] w-[97%] mx-auto">
        <CustomHeader pageName="Settings" />
        <div>
          <Page kind="wide">
            <PageHeader title="Settings" />

            <Card
              elevation="none"
              pad={{ top: "none", horizontal: "large", bottom: "large" }}
              margin={{ bottom: "large" }}
            >
              {applications.map((page, pageIndex) => (
                <div key={`page-${pageIndex}-${page.name}`}>
                  <PageHeader title={page.label} />
                  <div>
                    {page.applications.map((app, appIndex) => (
                      <Form
                        key={`form-${pageIndex}-${appIndex}`}
                        value={app}
                        onSubmit={({ value }) => console.log(value)}
                        onChange={(e) =>
                          handleFormChange(e, pageIndex, appIndex)
                        }
                        className="flex flex-row gap-3 items-end "
                      >
                        <div className="my-2">
                          <Button
                            color="#ec3331"
                            icon={<Trash />}
                            onClick={() =>
                              handleRemoveApplication(pageIndex, appIndex)
                            }
                          ></Button>
                        </div>
                        <FormField
                          name="name"
                          label={appIndex == 0 ? "Name" : null}
                          htmlFor="name"
                        >
                          <TextInput
                            id={`name-${pageIndex}-${appIndex}`}
                            name="name"
                            type="text"
                            onChange={() => {
                              setCurrentFocus(`name-${pageIndex}-${appIndex}`);
                            }}
                            ref={(el) =>
                              (inputRefs.current[
                                `name-${pageIndex}-${appIndex}`
                              ] = el)
                            }
                          />
                        </FormField>
                        <FormField
                          name="link"
                          label={appIndex == 0 ? "Link" : null}
                          htmlFor="link"
                        >
                          <TextInput
                            id="link"
                            name="link"
                            type="text"
                            placeholder="Link"
                            onChange={() => {
                              setCurrentFocus(`link-${pageIndex}-${appIndex}`);
                            }}
                            ref={(el) =>
                              (inputRefs.current[
                                `link-${pageIndex}-${appIndex}`
                              ] = el)
                            }
                          />
                        </FormField>
                        <FormField
                          label={appIndex == 0 ? "Image" : null}
                          htmlFor="image"
                        >
                          <FileInput
                            multiple={false}
                            onChange={(e) => {
                              const newFiles = [...files];
                              if (!newFiles[pageIndex]) {
                                newFiles[pageIndex] = [];
                              }
                              newFiles[pageIndex][appIndex] = e.target.files[0];
                              setFiles(newFiles);
                            }}
                            confirmRemove={({ onConfirm, onCancel }) => (
                              <Layer onClickOutside={onCancel} onEsc={onCancel}>
                                <Box
                                  pad="medium"
                                  gap="medium"
                                  width={{ min: "medium" }}
                                >
                                  <Box gap="xsmall">
                                    <Heading level={2} margin="none">
                                      Remove file?
                                    </Heading>
                                    <Paragraph margin="none">
                                      This action cannot be undone.
                                    </Paragraph>
                                  </Box>
                                  {/* <ButtonGroup alignSelf="end"> */}
                                  <Button label="Cancel" onClick={onCancel} />
                                  <Button
                                    label="Remove file"
                                    onClick={onConfirm}
                                    primary
                                  />
                                  {/* </ButtonGroup> */}
                                </Box>
                              </Layer>
                            )}
                            messages={{
                              dropPrompt: "Drag and drop",
                            }}
                          />
                        </FormField>
                        <Button
                          secondary
                          label="Upload"
                          disabled={!files[pageIndex]?.[appIndex]}
                          busy={busyUploadButton[pageIndex]?.[appIndex]}
                          onClick={async () => {
                            const newBusyUploadButton = [...busyUploadButton];
                            if (!newBusyUploadButton[pageIndex]) {
                              newBusyUploadButton[pageIndex] = [];
                            }
                            newBusyUploadButton[pageIndex][appIndex] = true;
                            setBusyUploadButton(newBusyUploadButton);
                            const fileName = await uploadFile(
                              files[pageIndex][appIndex]
                            );
                            if (fileName) {
                              const newApplication = {
                                ...app,
                              };
                              newApplication.image = `/images/${fileName}`;
                              handleFormChange(
                                newApplication,
                                pageIndex,
                                appIndex
                              );
                              newBusyUploadButton[pageIndex][appIndex] = false;
                              setBusyUploadButton(newBusyUploadButton);
                            }
                          }}
                        ></Button>
                      </Form>
                    ))}
                    <div className="mt-5 ml-10">
                      <Button
                        onClick={() => handleAddApplication(pageIndex)}
                        secondary
                        label="Add Row"
                      ></Button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-10 ">
                <Button
                  onClick={handleSave}
                  primary
                  label="Save Settings"
                ></Button>
              </div>
            </Card>
          </Page>
        </div>
      </div>
    </div>
  );
}
