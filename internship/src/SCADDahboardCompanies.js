import React from "react";
import { Search, Download, X } from "lucide-react";

const SCADDashboardCompanies = ({
  companies,
  setCompanies,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  addNotification,
  openModal,
}) => {
  const handleCompanyAction = (id, action) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === id
          ? {
              ...company,
              status: action === "accept" ? "Accepted" : "Rejected",
            }
          : company
      )
    );
    const company = companies.find((c) => c.id === id);
    addNotification(
      `Company ${company.name} has been ${
        action === "accept" ? "accepted" : "rejected"
      }`,
      "company"
    );
  };

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter ? company.status === statusFilter : true)
  );

  return (
    <div style={{ animation: "fadeIn 0.3s" }}>
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          color: "#1f2937",
        }}
      >
        Manage Companies
      </h2>
      <div
        style={{
          marginBottom: "1.5rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{ position: "relative", flex: "1 1 20rem", minWidth: "15rem" }}
        >
          <Search
            style={{
              position: "absolute",
              left: "0.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9ca3af",
              pointerEvents: "none",
            }}
            size={16}
          />
          <input
            type="text"
            placeholder="Search by company name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "0.4rem 0.4rem 0.4rem 2rem",
              width: "100%",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              outline: "none",
              boxSizing: "border-box",
              fontSize: "0.875rem",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
            onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: "0.4rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.375rem",
            outline: "none",
            minWidth: "12rem",
            width: "12rem",
            fontSize: "0.875rem",
            transition: "border-color 0.3s ease",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
          onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      {filteredCompanies.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem" }}>
          <p style={{ color: "#6b7280" }}>No companies found.</p>
        </div>
      ) : (
        <div
          style={{
            background: "#fff",
            borderRadius: "0.375rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
        >
          <div style={{ overflowX: "auto", maxWidth: "100%" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                tableLayout: "fixed",
              }}
            >
              <thead>
                <tr style={{ background: "#f3f4f6" }}>
                  <th
                    style={{
                      padding: "1rem",
                      textAlign: "left",
                      color: "#1f2937",
                      width: "25%",
                    }}
                  >
                    Name
                  </th>
                  <th
                    style={{
                      padding: "1rem",
                      textAlign: "left",
                      color: "#1f2937",
                      width: "25%",
                    }}
                  >
                    Industry
                  </th>
                  <th
                    style={{
                      padding: "1rem",
                      textAlign: "left",
                      color: "#1f2937",
                      width: "20%",
                    }}
                  >
                    Status
                  </th>
                  <th
                    style={{
                      padding: "1rem",
                      textAlign: "left",
                      color: "#1f2937",
                      width: "30%",
                    }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.map((company) => (
                  <tr
                    key={company.id}
                    style={{
                      background: "none",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f9fafb")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <td
                      style={{
                        padding: "1rem",
                        borderBottom: "1px solid #e5e7eb",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {company.name}
                    </td>
                    <td
                      style={{
                        padding: "1rem",
                        borderBottom: "1px solid #e5e7eb",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {company.industry}
                    </td>
                    <td
                      style={{
                        padding: "1rem",
                        borderBottom: "1px solid #e5e7eb",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <span
                        style={{
                          padding: "0.25rem 0.5rem",
                          borderRadius: "9999px",
                          fontSize: "0.75rem",
                          ...(company.status === "Accepted"
                            ? { background: "#d1fae5", color: "#065f46" }
                            : company.status === "Rejected"
                            ? { background: "#fee2e2", color: "#991b1b" }
                            : { background: "#fefcbf", color: "#975a16" }),
                        }}
                      >
                        {company.status}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "1rem",
                        borderBottom: "1px solid #e5e7eb",
                        display: "flex",
                        gap: "0.5rem",
                        alignItems: "center",
                        minWidth: "0",
                      }}
                    >
                      <button
                        onClick={() => openModal("companies", company)}
                        style={{
                          color: "#3b82f6",
                          cursor: "pointer",
                          padding: "0.5rem 0.75rem",
                          border: "1px solid #3b82f6",
                          borderRadius: "0.375rem",
                          background: "#fff",
                          transition: "all 0.3s ease",
                          whiteSpace: "nowrap",
                          minWidth: "5rem",
                          textAlign: "center",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.background = "#3b82f6";
                          e.target.style.color = "#fff";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.background = "#fff";
                          e.target.style.color = "#3b82f6";
                        }}
                      >
                        View Details
                      </button>
                      {company.status === "Pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleCompanyAction(company.id, "accept")
                            }
                            style={{
                              padding: "0.5rem 0.75rem",
                              background: "#10b981",
                              color: "#fff",
                              border: "none",
                              borderRadius: "0.375rem",
                              cursor: "pointer",
                              transition: "background-color 0.3s ease",
                              whiteSpace: "nowrap",
                              minWidth: "5rem",
                              textAlign: "center",
                            }}
                            onMouseOver={(e) =>
                              (e.target.style.background = "#059669")
                            }
                            onMouseOut={(e) =>
                              (e.target.style.background = "#10b981")
                            }
                          >
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              handleCompanyAction(company.id, "reject")
                            }
                            style={{
                              padding: "0.5rem 0.75rem",
                              background: "#ef4444",
                              color: "#fff",
                              border: "none",
                              borderRadius: "0.375rem",
                              cursor: "pointer",
                              transition: "background-color 0.3s ease",
                              whiteSpace: "nowrap",
                              minWidth: "5rem",
                              textAlign: "center",
                            }}
                            onMouseOver={(e) =>
                              (e.target.style.background = "#dc2626")
                            }
                            onMouseOut={(e) =>
                              (e.target.style.background = "#ef4444")
                            }
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SCADDashboardCompanies;
