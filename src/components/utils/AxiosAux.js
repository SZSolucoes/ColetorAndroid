
import Axios from 'axios';

export const doChangeUrlService = (empresa, ambiente) => {
    switch (empresa) { // EMPRESA SELECIONADA
        case '1': // Centelha
            switch (ambiente) {
                case '1': // Ambiente de produção
                    Axios.defaults.baseURL = 'http://192.168.50.219/cgi-bin/coletorCentelha.sh/WService=coletorCentelha';
                    break;
                case '2': // Ambiente de homologação
                    Axios.defaults.baseURL = 'http://10.4.0.35/cgi-bin/coletorCentelha.sh/WService=coletorCentelha';
                    break;
                default:
            }
            break;
        case '2': // Dw
            switch (ambiente) {
                case '1': // Ambiente de produção
                    Axios.defaults.baseURL = 'http://192.168.50.219/cgi-bin/coletorDW.sh/WService=coletorDW';
                    break;
                case '2': // Ambiente de homologação
                    Axios.defaults.baseURL = 'http://10.4.0.35/cgi-bin/coletorDW.sh/WService=coletorDW';
                    break;
                default:
            }
            break;
        default:
    }
};
