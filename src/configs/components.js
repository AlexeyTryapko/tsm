import SignalSourceForm from '../components/forms/SignalSource';
import NoiseForm from '../components/forms/Noise';
import ReferenceSourceForm from '../components/forms/ReferenceSource';
import ComparatorForm from '../components/forms/Comparator';
import SignalEnergy from '../components/modals/SignalEnergy';
import SpectralDensity from '../components/modals/SpectralDensity';
import {compReferences} from '../expand/config/ref'

export const componentReferences = {

    "SIGNAL SOURCE": SignalSourceForm,
    "NOISE":NoiseForm,
    "REFERENCE SOURCE":ReferenceSourceForm,
    "SIGNAL ENREGY":SignalEnergy,
    "COMPARATOR":ComparatorForm,
    "SPECTRAL DENSITY":SpectralDensity,
    ...compReferences,
}