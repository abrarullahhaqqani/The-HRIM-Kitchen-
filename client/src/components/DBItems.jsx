/*
import React from "react";
import MaterialTable from "material-table";

const DBItems = () => {
  return (
    <div className="flex items-center justify-self-center gap-4 pt-6 w-full">
      <MaterialTable
        title="Remote Data Preview"
        columns={[
          {
            title: "Avatar",
            field: "avatar",
            render: (rowData) => (
              <img
                style={{ height: 36, borderRadius: "50%" }}
                src={rowData.avatar}
              />
            ),
          },
          { title: "Id", field: "id" },
          { title: "First Name", field: "first_name" },
          { title: "Last Name", field: "last_name" },
        ]}
        data={(query) =>
          new Promise((resolve, reject) => {
            let url = "https://reqres.in/api/users?";
            url += "per_page=" + query.pageSize;
            url += "&page=" + (query.page + 1);
            fetch(url)
              .then((response) => response.json())
              .then((result) => {
                resolve({
                  data: result.data,
                  page: result.page - 1,
                  totalCount: result.total,
                });
              });
          })
        }
      />
    </div>
  );
};

export default DBItems;
*/
/*
import React from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({ direction: "ltr" }); // Ensure direction is defined

const DBItems = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="flex items-center justify-self-center gap-4 pt-6 w-full">
        <MaterialTable
          title="Remote Data Preview"
          columns={[
            {
              title: "Avatar",
              field: "avatar",
              render: (rowData) => (
                <img
                  style={{ height: 36, borderRadius: "50%" }}
                  src={rowData.avatar}
                  alt="avatar"
                />
              ),
            },
            { title: "Id", field: "id" },
            { title: "First Name", field: "first_name" },
            { title: "Last Name", field: "last_name" },
          ]}
          data={(query) =>
            new Promise((resolve, reject) => {
              let url = "https://reqres.in/api/users?";
              url += "per_page=" + query.pageSize;
              url += "&page=" + (query.page + 1);
              fetch(url)
                .then((response) => response.json())
                .then((result) => {
                  resolve({
                    data: result.data,
                    page: result.page - 1,
                    totalCount: result.total,
                  });
                });
            })
          }
        />
      </div>
    </ThemeProvider>
  );
};

export default DBItems;
*/

import React from "react";
import { DataTable } from "../components";

const DBItems = () => {
  return (
    <div className="flex items-center justify-self-center gap-4 pt-6 w-full">
      <DataTable />
    </div>
  );
};

export default DBItems;
