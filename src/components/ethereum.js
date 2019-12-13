import Web3 from 'web3';
import ContractFactory from '../contracts/ContractFactory.json';
import Interaction from '../contracts/Interaction.json';

export const eventNames = {
  PAYMENT: 'payment',
  REQUEST_WRITE: 'request_write',
  ENTRY_ADDED: 'entry_added',
};

export const paymentEventTypes = {
  userPaidForArrengement: 0,
  paymentSuccess: 1,
};

let listeners = [];
let listeningStarted = false;

class ContractsListener {
  startListening = () => {
    const socketProvider = new Web3.providers.WebsocketProvider(process.env.RINKEBY_RPC_URL);
    this.web3Instance = new Web3(socketProvider);
    this.account = this.web3Instance.eth.accounts.privateKeyToAccount(process.env.PRIVATE_ETHEREUM_KEY);
    this.web3Instance.eth.accounts.wallet.add(this.account);
    this.web3Instance.eth.defaultAccount = this.account.address;
    this.options = { from: this.account.address };
    this.contractFactory = new this.web3Instance.eth.Contract(ContractFactory.abi, process.env.CONTRACT_FACTORY_ADDRESS, this.options);
    this.interactionContract = new this.web3Instance.eth.Contract(Interaction.abi, process.env.INTERACTION_CONTRACT_ADDRESS, this.options);

    this.paymentSubscription = this.interactionContract.events.PaymentEvent().on('data', this.handlePaymentEvent);
    this.requestWriteHistorySubscription = this.interactionContract.events.RequestWriteHistory().on('data', this.handleRequestWriteEvent);
    this.entryAddedSubscription = this.interactionContract.events.EntryAddedByDoctor().on('data', this.handleEntryAddedEvent);

    listeningStarted = true;
  }

  stopListening = () => {
    if (listeningStarted) {
      this.paymentSubscription.unsubscribe();
      this.requestWriteHistorySubscription.unsubscribe();
      this.entryAddedSubscription.unsubscribe();

      listeningStarted = false;
    }
  }

  handlePaymentEvent = ({ returnValues }) => {
    const normilizedEvent = {
      name: eventNames.PAYMENT,
      type: returnValues.eventType,
      doctorEthAddress: returnValues.doctor,
      patientEthAddress: returnValues.patient,
      payload: '',
    };
    this.spreadAmongListeners(normilizedEvent);
  }

  handleRequestWriteEvent = ({ returnValues }) => {
    const normilizedEvent = {
      name: eventNames.REQUEST_WRITE,
      type: 0,
      doctorEthAddress: returnValues.doctor,
      patientEthAddress: returnValues.patient,
      payload: JSON.stringify(returnValues.entry),
    };
    this.spreadAmongListeners(normilizedEvent);
  }

  handleEntryAddedEvent = ({ returnValues }) => {
    const normilizedEvent = {
      name: eventNames.ENTRY_ADDED,
      type: 0,
      doctorEthAddress: returnValues.doctor,
      patientEthAddress: returnValues.patient,
      payload: JSON.stringify(returnValues.entry),
    };
    this.spreadAmongListeners(normilizedEvent);
  }

  spreadAmongListeners = (event) => {
    listeners.forEach(listener => listener(event));
  }

  addListener = (listener) => {
    listeners.push(listener);
  }

  removeListener = (listenerToRemove) => {
    listeners = listeners.filter(listener => listener !== listenerToRemove);
  }
}

export default new ContractsListener();
