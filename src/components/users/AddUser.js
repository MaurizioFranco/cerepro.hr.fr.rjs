import React from 'react';
import SkyLight from 'react-skylight';

class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = { brand: '', model: '', year: '', color: '', price: '' };
        this.gridRef = React.createRef();
    }

    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
    }

    // Save car and close modal form
    handleSubmit = (event) => {
        event.preventDefault();
        var newCar = {
            brand: this.state.brand, model: this.state.model,
            color: this.state.color, years: this.state.years,
            price: this.state.price
        };
        this.props.addCar(newCar);
        this.gridRef.current.hide();
    }
    // Cancel and close modal form
    cancelSubmit = (event) => {
        event.preventDefault();
        this.gridRef.current.hide();
    }

    render() {
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref={this.gridRef}>
                    <h3>New car</h3>
                    <form>
                        <input type="text" placeholder="Brand" name="brand"
                            onChange={this.handleChange} /><br />
                        <input type="text" placeholder="Model" name="model"
                            onChange={this.handleChange} /><br />
                        <input type="text" placeholder="Color" name="color"
                            onChange={this.handleChange} /><br />
                        <input type="text" placeholder="Year" name="years"
                            onChange={this.handleChange} /><br />
                        <input type="text" placeholder="Price" name="price"
                            onChange={this.handleChange} /><br />
                        <button onClick={this.handleSubmit}>Save</button>
                        <button onClick={this.cancelSubmit}>Cancel</button>
                    </form>
                </SkyLight>
                <div>
                    <button style={{ 'margin': '10px' }}
                        onClick={() => this.gridRef.current.show()}>New car</button>
                </div>
            </div>
        );
    }


}
export default AddUser;
