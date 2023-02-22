import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import * as Constants from "../../constants";

function CandidateStatesList() {
  const [candidateStates, setCandidateStates] = useState([]);
  const [showInsertModal, setShowInsertModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(Constants.FULL_CANDIDATE_STATES_API_URI, {
        headers: {
          Authorization: "Basic " + btoa("9@9.9:9"),
        },
      });
      const data = await response.json();
      setCandidateStates(data);
    };
    fetchData();
  }, []);

  async function handleInsertSubmit(formData) {
    const response = await fetch(
        Constants.FULL_CANDIDATE_STATES_API_URI,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + btoa('9@9.9:9'),
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
    setCandidateStates([...candidateStates, formData]);
    setShowInsertModal(false);
  }

  async function handleEditSubmit(formData) {
    const response = await fetch(
      Constants.FULL_CANDIDATE_STATES_API_URI + '/' + formData.id,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + btoa('9@9.9:9'),
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await response.json();
    setCandidateStates(
      candidateStates.map((state) => {
        if (state.id === formData.id) {
          return data;
        }
        return state;
      })
    );
    setShowEditModal(false);
  }

  async function handleDeleteClick(state) {
    const response = await fetch(
      Constants.FULL_CANDIDATE_STATES_API_URI + '/' + state.id,
      {
        method: 'DELETE',
        headers: {
          Authorization: 'Basic ' + btoa('9@9.9:9'),
        },
      }
    );
    if (response.ok) {
      setCandidateStates(
        candidateStates.filter((s) => s.id !== state.id)
      );
    }
  }


  function CustomColorCell(props) {
    const { value } = props;
    return (
      <div style={{ backgroundColor: value, height: "100%", width: "100%" }} />
    );
  }

  const columns = [
    {
      Header: "ID",
      accessor: "id",
      width: 42,
    },
    {
      Header: "Status Code",
      accessor: "statusCode",
      width: 90,
    },
    {
      Header: "Status Label",
      accessor: "statusLabel",
    },
    {
      Header: "Status Description",
      accessor: "statusDescription",
    },
    {
      Header: "Status Color",
      accessor: "statusColor",
      Cell: CustomColorCell,
      width: 100,
    },
    {
      Header: "Actions",
      Cell: (props) => {
        const { original } = props;
        return (
          <div>
            <button
              onClick={() => {
                setSelectedState(original);
                setShowEditModal(true);
              }}
            >
              Edit
            </button>
            <button onClick={() => handleDeleteClick(original)}>Delete</button>
          </div>
        );
      },
      width: 100,
    },
  ];

  return (
    <div style={{ margin: "20px" }}>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setShowInsertModal(true)}>
          Add Candidate State
        </button>
      </div>
      <ReactTable
        data={candidateStates}
        columns={columns}
        defaultPageSize={13}
        style={{ fontSize: "15px" }}
        getTrProps={(state, rowInfo, column, instance) => {
          return {
            style: {
              backgroundColor:
                rowInfo && rowInfo.index % 2 === 0 ? "#efefef" : "#fff",
            },
          };
        }}
      />
      {showInsertModal && (
        <Insert
          onHide={() => setShowInsertModal(false)}
          onSubmit={handleInsertSubmit}
        />
      )}
      {showEditModal && (
        <Edit
          state={selectedState}
          onHide={() => setShowEditModal(false)}
          onSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
}

function Insert(props) {
  const { onHide, onSubmit } = props;
  const [formData, setFormData] = useState({
    roleId: "",
    statusCode: "",
    statusLabel: "",
    statusDescription: "",
    statusColor: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(formData);
  }

  return (
    <div
      className="modal"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Add Candidate State</h4>
            <button type="button" className="close" onClick={onHide}>
              ×
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="roleId">Role ID</label>
                <input
                  type="text"
                  id="roleId"
                  name="roleId"
                  value={formData.roleId}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="statusCode">Status Code</label>
                <input
                  type="text"
                  id="statusCode"
                  name="statusCode"
                  value={formData.statusCode}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="statusLabel">Status Label</label>
                <input
                  type="text"
                  id="statusLabel"
                  name="statusLabel"
                  value={formData.statusLabel}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="statusDescription">Status Description</label>
                <input
                  type="text"
                  id="statusDescription"
                  name="statusDescription"
                  value={formData.statusDescription}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="statusColor">Status Color</label>
                <input
                  type="text"
                  id="statusColor"
                  name="statusColor"
                  value={formData.statusColor}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function Edit(props) {
  const { state, onHide, onSubmit } = props;
  const [formData, setFormData] = useState({
    id: state.id,
    roleId: state.roleId,
    statusCode: state.statusCode,
    statusLabel: state.statusLabel,
    statusDescription: state.statusDescription,
    statusColor: state.statusColor,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(formData);
  }

  return (
    <div
      className="modal"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Edit Candidate State</h4>
            <button type="button" className="close" onClick={onHide}>
              ×
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="roleId">Role ID</label>
                <input
                  type="text"
                  id="roleId"
                  name="roleId"
                  value={formData.roleId}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="statusCode">Status Code</label>
                <input
                  type="text"
                  id="statusCode"
                  name="statusCode"
                  value={formData.statusCode}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="statusLabel">Status Label</label>
                <input
                  type="text"
                  id="statusLabel"
                  name="statusLabel"
                  value={formData.statusLabel}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="statusDescription">Status Description</label>
                <input
                  type="text"
                  id="statusDescription"
                  name="statusDescription"
                  value={formData.statusDescription}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="statusColor">Status Color</label>
                <input
                  type="text"
                  id="statusColor"
                  name="statusColor"
                  value={formData.statusColor}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(CandidateStatesList);
