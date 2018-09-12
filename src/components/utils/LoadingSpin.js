import React from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

class LoadingSpin extends React.Component {

    render() {
        return (
            <Spinner 
                visible={this.props.visible} 
                textContent={this.props.text}
                animation={'fade'}
                color={'#FFF'} 
                textStyle={{ 
                    color: this.props.color, 
                    fontWeight: 'bold'
                }}
                overlayColor={'rgba(0, 0, 0, 0.60)'} 
            />
        );
    }
}

const mapStateToProps = (state) => ({
    visible: state.LoadingSpinReducer.visible,
    text: state.LoadingSpinReducer.text,
    color: state.LoadingSpinReducer.color
});

export default connect(mapStateToProps, {})(LoadingSpin);

