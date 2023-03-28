import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Commons from "../../commons.js";
import * as Constants from "../../constants.js";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  InputLabel,
} from "@material-ui/core";
import styles from "../../styles.js";

class AddCoursePages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      code: "",
      bodyText: "",
      fileName: "",
      isModalOpen: false,
      selectedOwner: {},
      selectedOwnerId: "",
      owners: [],
    };
    this.gridRef = React.createRef();
  }

  componentDidMount() {
    this.fetchOwners();
  }

  fetchOwners = () => {
    Commons.executeFetch(
      Constants.BACKEND_API_PREFIX + Constants.GET_USER_BY_ROLE_API + "50",
      "GET",
      this.setOwners
    );
  };

  setOwners = (retrievedOwners) => {
    Commons.debugMessage("setOwners - START - owners: " + retrievedOwners);
    this.setState({
      owners: retrievedOwners,
    });
    console.log(retrievedOwners);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const selectedId = this.state.selectedOwner.id;
    const selectedOwner = this.state.owners.find(
      (owner) => owner.id === selectedId
    );
    const selectedOwnerId = selectedOwner.id;
    this.setState({ selectedOwnerId: selectedOwnerId });
    var item = {
      title: this.state.title,
      code: this.state.code,
      bodyText: this.state.bodyText,
      fileName: this.state.fileName,
    };
    this.addCoursePageCustom(item);
  };

  addCoursePageCustom = (item) => {
    console.log("Id dell'utente: " + this.state.selectedOwner.id);
    const user = JSON.parse(sessionStorage.getItem("user"));
    const userLoggedId = user.id;
    var coursePageCustom = {
      bodyText: item.bodyText,
      fileName: item.fileName,
      title: item.title,
      code: item.code,
      userId: this.state.selectedOwner.id,
      opened_by: userLoggedId,
    };
    console.log("ITEM: " + JSON.stringify(coursePageCustom));
    Commons.executeFetch(
      Constants.CREATE_COURSEPAGE_CUSTOM,
      "POST",
      this.insertSuccess,
      Commons.operationError,
      JSON.stringify(coursePageCustom),
      true
    );
  };

  insertError = (err) => {
    console.log("INSERT COURSE PAGE KO");
    toast.error(err.errorMessage, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
    console.error(err);
  };

  insertSuccess = (response) => {
    Commons.operationSuccess();
    this.setState({ isModalOpen: false });
    this.props.refreshCoursePagesList();
  };

  cancelSubmit = (event) => {
    event.preventDefault();
    this.setState({ selectedOwner: "" });
    this.setState({ isModalOpen: false });
  };

  render() {
    return (
      <React.Fragment>
        <Dialog
          open={this.state.isModalOpen}
          onClose={() => this.setState({ isModalOpen: false })}
        >
          <DialogTitle
            className={"commonDialogTitle"}
            style={styles.modalTitle}
          >
            INSERISCI NUOVA POSIZIONE
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="TITOLO POSIZIONE"
              name="title"
              onChange={this.handleChange}
              style={styles.field}
            />
            <TextField
              fullWidth
              label="CODICE ALFANUMERICO"
              name="code"
              onChange={this.handleChange}
              style={styles.field}
            />
            <TextField
              fullWidth
              label="BREVE DESCRIZIONE"
              name="bodyText"
              onChange={this.handleChange}
              style={styles.fieldBeforeSelectLabel}
            />
            <InputLabel style={styles.selectLabel}>
              HR RESPONSABILE DELLA POSIZIONE
            </InputLabel>
            <Select
              fullWidth
              label="Proprietario"
              name="proprietario"
              value={this.state.selectedOwner}
              onChange={(e) => this.setState({ selectedOwner: e.target.value })}
              style={styles.fieldBeforeButtons}
            >
              {this.state.owners.map((owner) => (
                <option key={owner} value={owner}>
                  {owner.firstname + " " + owner.lastname}
                </option>
              ))}
            </Select>

            {/* <TextField fullWidth label="File Name" name="fileName" onChange={this.handleChange} style={moreMarginBottom} /> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSubmit} style={styles.saveButton}>
              Salva
            </Button>
            <Button onClick={this.cancelSubmit} style={styles.cancelButton}>
              Annulla
            </Button>
          </DialogActions>
        </Dialog>
        <Button
          className={"add-button"}
          style={styles.addButton}
          onClick={() => this.setState({ isModalOpen: true })}
        >
          +
        </Button>
      </React.Fragment>
    );
  }
}

export default AddCoursePages;
