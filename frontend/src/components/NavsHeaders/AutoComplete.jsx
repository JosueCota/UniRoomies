/* eslint warning-keys: 0 */  // --> OFF
import React, { Component } from 'react'
import PlacesAutocomplete from "react-places-autocomplete";

//Auto complete class for location searching
export class AutoComplete extends Component {
    constructor(props) {
        super(props);
        this.state = { address: this.props.address};
        this.name = { name: this.props.name };
    }

      handleChange = address => {
        this.setState({ address });
        // if (address in suggestions)
        this.props.onAddressChange(address.trim());        
      };
      
  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={{
            types: ['(cities)'],
            componentRestrictions: {country: "us"},
           }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search City ...',
                className:'location-search-input',
                name:this.props.name? this.props.name: undefined,
                required:this.props.name? true: false
              })}
            />
            <div className="autocomplete-dropdown-container" >
              {loading && <div style={{color: "white"}}>Loading...</div>}
              {suggestions.map(suggestion => {
                suggestion.description = suggestion.description.replace(", USA", "");
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (

<div key={suggestion.id} className="inputSuggestion"
                    {...getSuggestionItemProps(suggestion, {
                      style,
                    })} 
                  >
                    
                    <span key={suggestion.placeId} >{suggestion.description}</span>
                  </div>                   

                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
} 
export default AutoComplete
