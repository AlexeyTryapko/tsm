import {
    adder,
    monitor,
    communicationLine,
    
} from '../blocks';
import MonitorModal from '../components/Monitor'
import CommunicationLineForm from '../components/CommunicationLine'

export const blockReferences ={
    "ADDER":adder,
    "MONITOR": monitor,
    "COMMUNICATION LINE":communicationLine,
}

export const compReferences = {

    "MONITOR": MonitorModal,
    "COMMUNICATION LINE":CommunicationLineForm,
}

