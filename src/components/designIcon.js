import "../css/homepage.css";

function DesignIcon() {
  return (
    <div className="iconFrame">
      <div className="options">
        <h3 className="selectOption">
          <center>&#8942;</center>
        </h3>
      </div>
      <img src="/img/logoWhitebg.png" className="pic" alt="No projects yet" />

      <h3 className="titleDesign">Project Name</h3>
      <h3 className="subDate">Project Name</h3>
    </div>
  );
}

export default DesignIcon;
