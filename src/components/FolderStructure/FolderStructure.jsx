import React, { useState } from "react";

const RenderBtn = ({ ele, index, initialSt, setStructure }) => {
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
    <div
      style={{ background: "#c4c4c4", margin: "0px 5px", cursor: "pointer" }}
    >
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
            setStructure(newARR);
          }}
        >
          Create Folder Inside {ele.name}
        </button>
      </div>
    </div>
  );
};

const GetFolderSt = ({ st, id, initialSt, setStructure }) => {
  const [show, updateShow] = useState({});
  return st.map((ele, index) => {
    return (
      <div
        key={`${id}${index}`}
        style={{ display: "flex", alignItems: "baseline" }}
      >
        {ele.type === "folder" && ele?.content?.length && (
          <button
            key={`${id}${index}`}
            style={{ height: "100%" }}
            onClick={() =>
              updateShow({
                ...show,
                [`${id}${index}`]: !show[`${id}${index}`],
              })
            }
          >
            V
          </button>
        )}
        {ele.hasOwnProperty("content") ? (
          <div style={{ width: "300px" }}>
            {
              <RenderBtn
                initialSt={initialSt}
                setStructure={setStructure}
                ele={ele}
                index={index}
              />
            }
            <div>
              {show[`${id}${index}`] && (
                <GetFolderSt
                  key={`${id}${index}`}
                  id={index}
                  st={ele.content}
                  initialSt={initialSt}
                  setStructure={setStructure}
                />
              )}
            </div>
          </div>
        ) : (
          <div
            style={{
              background: ele.type === "folder" ? "#c4c4c4" : "#b98d74",
              margin: "10px",
              width: "300px",
            }}
          >
            {ele.type === "folder" ? (
              <RenderBtn
                initialSt={initialSt}
                setStructure={setStructure}
                ele={ele}
                index={index}
              />
            ) : (
              ele.name
            )}
          </div>
        )}
      </div>
    );
  });
};

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
  return (
    <div className="folder-structure">
      <h1>Folder Structure</h1>
      <h6>hover over the folder below to create new</h6>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            height: "10px",
            width: "10px",
            borderRadius: "50%",
            background: "#c4c4c4",
          }}
        ></div>
        <p>folder</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            height: "10px",
            width: "10px",
            borderRadius: "50%",
            background: "#b98d74",
          }}
        ></div>
        <p>file</p>
      </div>
      {
        <GetFolderSt
          st={initialSt}
          initialSt={initialSt}
          setStructure={setStructure}
          id=""
        />
      }
    </div>
  );
}

export default FolderStructure;
