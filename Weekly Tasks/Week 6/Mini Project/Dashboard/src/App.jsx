import { useState } from "react";
import "./App.css";
import { UserContextProvider } from "./Context/UserContext";
import Button from "./components/Button/Button";
import { ThemeContextProvider } from "./Context/ThemeContext";

function App() {
  const [user, setUser] = useState("logout");
  const [theme, setTheme] = useState("light");

  const changeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.body.style.backgroundColor = "#1e1e1e";
      document.querySelector(".sideNavbar").style.backgroundColor = "#272727";
      document.querySelector(".navbar").style.backgroundColor = "#272727";
      document.body.style.color = "#f0f0f0";
    } else {
      setTheme("light");
      document.body.style.backgroundColor = "#f0f0f0";
      document.querySelector(".sideNavbar").style.backgroundColor = "white";
      document.querySelector(".navbar").style.backgroundColor = "white";
      document.body.style.color = "#1e1e1e";
    }
  };
  const userChange = () => {
    if (user === "login") {
      setUser("logout");
    } else {
      setUser("login");
    }
  };

  return (
    <ThemeContextProvider value={{ theme, changeTheme }}>
      <UserContextProvider value={{ user, userChange }}>
        <div className="flex">
          <div className="sideNavbar">
            <h1>LOGO</h1>
            <nav>
              <ul>
                <li className="active">Dashboard</li>
                <li>Analytics</li>
                <li>Invoices</li>
                <li>Schedule</li>
                <li>Setting</li>
              </ul>
            </nav>
          </div>

          <div className="dashboard">
            <div className="navbar">
              <h2>Dashboard</h2>
              <Button />
            </div>

            <div className="analysis">
              <div className="analysis-top">
                <div className="analysis-card">
                  <h3>Total Sales</h3>
                  <p className="metric">
                    {user === "login" ? "$12.4K" : "N/A"}
                  </p>
                  <span>{user === "login" ? "+24% " : ""}this month</span>
                </div>

                <div className="analysis-card">
                  <h3>New Users</h3>
                  <p className="metric">{user === "login" ? "2,180" : "N/A"}</p>
                  <span>{user === "login" ? "+13% " : ""}this week</span>
                </div>

                <div className="analysis-card">
                  <h3>Active Orders</h3>
                  <p className="metric">{user === "login" ? "768" : "N/A"}</p>
                  <span>{user === "login" ? "+8% " : ""}growth</span>
                </div>

                <div className="analysis-card">
                  <h3>Support Tickets</h3>
                  <p className="metric">{user === "login" ? "42" : "N/A"}</p>
                  <span>{user === "login" ? "Resolved 91%" : ""}</span>
                </div>
              </div>

              <div className="analysis-bottom">
                <div className="analysis-graph">
                  <div
                    className="circle-chart chart-large"
                    style={
                      user === "login"
                        ? {
                            background:
                              "conic-gradient(rgb(20, 250, 250) 0%, rgb(20, 250, 250) 52%, #e8f3fb 52%, #e8f3fb 100%)",
                          }
                        : { background: "#e8f3fb" }
                    }
                  >
                    <span>{user === "login" ? "68%" : "N/A"}</span>
                  </div>
                  <div className="graph-label">
                    <h4>Monthly Growth</h4>
                    <p>Revenue and product adoption rate.</p>
                  </div>
                </div>

                <div className="analysis-graph">
                  <div
                    style={
                      user === "login"
                        ? {
                            background:
                              "conic-gradient(rgb(20, 250, 250) 0%, rgb(20, 250, 250) 52%, #e8f3fb 52%, #e8f3fb 100%)",
                          }
                        : { background: "#e8f3fb" }
                    }
                    className="circle-chart chart-medium"
                  >
                    <span>{user === "login" ? "52%" : "N/A"}</span>
                  </div>
                  <div className="graph-label">
                    <h4>Task Completion</h4>
                    <p>Completed tasks for current sprint.</p>
                  </div>
                </div>

                <div className="analysis-circles">
                  <div className="circle-mini">
                    <span
                      style={
                        user === "login"
                          ? {
                              background:
                                "conic-gradient(rgb(20, 250, 250) 0%,rgb(20, 250, 250) 82%,#dbeaf9 82%,#dbeaf9 100%)",
                            }
                          : { background: "#dbeaf9" }
                      }
                    >
                      {user === "login" ? "82%" : "N/A"}
                    </span>
                    <p>Engagement</p>
                  </div>
                  <div className="circle-mini">
                    <span
                      style={
                        user === "login"
                          ? {
                              background:
                                "conic-gradient(rgb(20, 250, 250) 0%,rgb(20, 250, 250) 82%,#dbeaf9 82%,#dbeaf9 100%)",
                            }
                          : { background: "#dbeaf9" }
                      }
                    >
                      {user === "login" ? "45%" : "N/A"}
                    </span>
                    <p>Conversions</p>
                  </div>
                  <div className="circle-mini">
                    <span
                      style={
                        user === "login"
                          ? {
                              background:
                                "conic-gradient(rgb(20, 250, 250) 0%,rgb(20, 250, 250) 82%,#dbeaf9 82%,#dbeaf9 100%)",
                            }
                          : { background: "#dbeaf9" }
                      }
                    >
                      {user === "login" ? "74%" : "N/A"}
                    </span>
                    <p>Retention</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
