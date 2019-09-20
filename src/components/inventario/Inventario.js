import React from 'react';

import FormInventario from './FormInventario';

export default class Inventario extends React.PureComponent {
    render() {
        return (
            <FormInventario {...this.props} />
        );
    }
}
