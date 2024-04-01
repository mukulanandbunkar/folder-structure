import React, { useState } from "react";

function FolderStructure() {
  const initialSructure = [
    {
      type: "folder",
      name: "src",
      content: [
        {
          name: "readme.txt",
          type: "file",
        },
        {
          name: "App",
          type: "folder",
          content: [
            {
              name: "App.jsx",
              type: "file",
            },
            {
              name: "App.css",
              type: "file",
            },
            {
              name: "1",
              type: "folder",
              content: [
                {
                  name: "1.jsx",
                  type: "file",
                },
                {
                  name: "1.css",
                  type: "file",
                },
              ],
            },
            {
              name: "2",
              type: "folder",
              content: [
                {
                  name: "2.jsx",
                  type: "file",
                },
                {
                  name: "2.css",
                  type: "file",
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const [initialSt, setStructure] = useState(initialSructure);

  const RenderBtn = ({ ele, index }) => {
    const [name, setName] = useState("");
    const [type, settype] = useState("folder");
    const [display, setDisplay] = useState("none");
    const onAddFolderFile = (ele, folder) => {
      return folder.map((item) => {
        if (item.name === ele.name && item.hasOwnProperty("content")) {
          console.log({
            ...item,
            content: [...item.content, { name: name, type: type }],
          });
          return {
            ...item,
            content: [...item.content, { name: name, type: type }],
          };
        } else if (item.name === ele.name) {
          return { ...item, content: [{ name: name, type: type }] };
        } else if (item.hasOwnProperty("content")) {
          return { ...item, content: [...onAddFolderFile(ele, item.content)] };
        } else {
          return { ...item };
        }
      });
    };
    return (
      <div style={{ background: "pink", margin: "5px", cursor: "pointer" }}>
        <div
          onMouseEnter={() => setDisplay("flex")}
          onMouseLeave={() => setDisplay("none")}
        >
          {ele.name}
        </div>
        <div
          onMouseOver={() => setDisplay("flex")}
          onMouseLeave={() => setDisplay("none")}
          style={{ display: display }}
          className="add-folder__wrapper"
        >
          <label for="folder-name">Folder Name</label>
          <input
            id="folder-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <select
            onChange={(event) => {
              settype(event.target.value);
            }}
            defaultValue="folder"
          >
            <option>folder</option>
            <option>file</option>
          </select>
          <button
            onClick={async () => {
              const newARR = await onAddFolderFile(ele, initialSt);
              console.log(newARR, "newArr");
              setStructure(newARR);
            }}
          >
            Create Folder Inside {ele.name}
          </button>
        </div>
      </div>
    );
  };

  const getFolderSt = (st) =>
    st.map((ele, index) => (
      <div style={{ paddingLeft: "10px" }}>
        {ele.hasOwnProperty("content") ? (
          <div style={{ width: "300px" }}>
            {<RenderBtn ele={ele} index={index} />}
            <div style={{ paddingLeft: "25px" }}>
              {getFolderSt(ele.content)}
            </div>
          </div>
        ) : (
          <div
            style={{
              background: ele.type === "folder" ? "pink" : "yellow",
              margin: "10px",
              width: "300px",
            }}
          >
            {ele.type === "folder" ? (
              <RenderBtn ele={ele} index={index} />
            ) : (
              ele.name
            )}
          </div>
        )}
      </div>
    ));
  return <div className="folder-structure">
    <h1>Folder Structure</h1>
    {getFolderSt(initialSt)}
    </div>;
}

export default FolderStructure;
