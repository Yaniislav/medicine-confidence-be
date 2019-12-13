import { notificationAction } from '../actions/notification';
import { userAction } from '../actions/user';

import { eventNames, paymentEventTypes } from './ethereum';

const listen = async (event) => {
  const notification = {
    title: '',
    message: '',
    sentAt: Date.now(),
    recipientAddress: '',
    sourceAddress: '',
    eventName: event.name,
    eventType: event.type,
    eventPayload: event.payload,
  };

  const patient = await userAction.findByEthAddress(event.patientEthAddress);
  const doctor = await userAction.findByEthAddress(event.doctorEthAddress);

  if (patient && doctor) {
    if (event.name === eventNames.PAYMENT) {
      if (event.eventType === paymentEventTypes.userPaidForArrengement) {
        notification.title = 'Patient paid for arrangement';
        notification.message = `Patient ${patient.firstName} ${patient.lastName} paid for arrengement`;
        notification.recipientAddress = doctor.ethAddress;
        notification.sourceAddress = patient.ethAddress;
      } else return;

    } else if (event.name === eventNames.REQUEST_WRITE) {
      notification.title = 'Add entry request';
      notification.message = `Doctor ${doctor.firstName} ${doctor.lastName} tries to add entry to you history`;
      notification.recipientAddress = patient.ethAddress;
      notification.sourceAddress = doctor.ethAddress;
    } else if (event.name === eventNames.ENTRY_ADDED) {
      notification.title = 'New entry added';
      notification.message = `Doctor ${doctor.firstName} ${doctor.lastName} has added entry to you history`;
      notification.recipientAddress = patient.ethAddress;
      notification.sourceAddress = doctor.ethAddress;
    } else return;

    notificationAction.create(notification);
  }
};

export default listen;
