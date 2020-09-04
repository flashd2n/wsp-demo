const onStartClicked = (name, glue) => {
    glue.workspaces.restoreWorkspace(name);
}

const onPrintClicked = async (name, glue) => {
    const layout = await glue.workspaces.layouts.export((layout) => layout.name === name);
    console.log(layout);
}

const populateLayouts = async (glue) => {
    const allWorkspaceLayouts = await glue.workspaces.layouts.getSummaries();
    const wspListElement = document.getElementById("wspList");
    wspListElement.innerHTML = "";

    allWorkspaceLayouts.forEach((layout) => {
        const name = layout.name;

        const appRowElement = document.createElement("div");
        appRowElement.style = "margin-top: 15px;"

        const appNameElement = document.createElement("div");
        appNameElement.style = "float: left; margin-right: 25px;";
        appNameElement.textContent = name;

        const startButtonWrapperElement = document.createElement("div");

        const startButtonElement = document.createElement("button");
        startButtonElement.textContent = "Start";
        startButtonElement.style = "float: left; margin-right: 25px;";
        startButtonElement.onclick = () => onStartClicked(name, glue);
        startButtonWrapperElement.appendChild(startButtonElement);

        const printButtonWrapperElement = document.createElement("div");

        const printButtonElement = document.createElement("button");
        printButtonElement.textContent = "Print";
        printButtonElement.onclick = () => onPrintClicked(name, glue);
        printButtonWrapperElement.appendChild(printButtonElement);

        appRowElement.appendChild(appNameElement);
        appRowElement.appendChild(startButtonWrapperElement);
        appRowElement.appendChild(printButtonElement);
  
        wspListElement.appendChild(appRowElement);
    });
};

window.GlueWeb({ libraries: [GlueWorkspaces], appManager: true })
    .then((glue) => {
        window.glue = glue;        

        console.log("glue ready");
        populateLayouts(glue);
    })
    .catch(console.log);