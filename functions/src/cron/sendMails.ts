import { firestore } from "firebase-admin";
import { types as templateTypes } from "../template";

import getActiveMailList from "./utils/getActiveMailList";
import getUserSmtp from "./utils/getUserSmtp";
import isScheduledFunc from "./utils/isScheduled";
import getPendingMailListItems from "./utils/getPendingMailListItems";
import mailer from "./utils/mailer";

const sendMails = async () => {
  try {
    const [activeMailList, activeMailLists, inactiveMailLists] =
      await getActiveMailList();

    // Info
    console.log({
      activeMailList: activeMailList?.id || null,
      activeMailLists: activeMailLists.map((doc) => doc.id),
      inactiveMailLists: inactiveMailLists.map((doc) => doc.id),
    });

    if (!activeMailList) {
      console.log("No activeMailList determined. Aborting...");
      return;
    }

    const smtp = await getUserSmtp(activeMailList.data().uid);
    if (!smtp) {
      console.log("User SMTP not found. Aborting...");
      return;
    }

    const isScheduled = isScheduledFunc(activeMailList.data().lastSent);
    if (isScheduled === false) {
      console.log("Not scheduled to send. Aborting...");
      return;
    }

    const pendingMailListItemDocs = await getPendingMailListItems(
      activeMailList
    );
    if (pendingMailListItemDocs.length === 0) {
      // TODO
      // Update activeMailList to be complete
      // set activeMailList = inactiveMailLists[0]
      // find pendingMailListItems
      // make transfers in activeMailLists and inactiveMailLists
    }

    // Send emails
    const emailData: templateTypes.Format[] = [];
    pendingMailListItemDocs.forEach((doc) => {
      emailData.push(...doc.data().list);
    });
    const connectionError = await mailer(
      activeMailList.data(),
      smtp,
      emailData,
      true
    );
    if (connectionError) {
      console.log("Error connecting to SMTP. Aborting...");
      return;
    }

    const promiseArr: Promise<firestore.WriteResult>[] = [];
    // // Last mailListItem for activeMailList was sent
    // if (
    //   Boolean(pendingMailListItemDocs[0]?.data()?.last) ||
    //   Boolean(pendingMailListItemDocs[1]?.data()?.last)
    // ) {
    //   // Mark activeMailList as inactive and complete
    //   promiseArr.push(
    //     activeMailList.ref.update({
    //       active: false,
    //       complete: true,
    //       lastSent: currentDate,
    //     })
    //   );

    //   // Mark the first inactiveMailList as active
    //   if (inactiveMailLists.length > 0) {
    //     promiseArr.push(
    //       inactiveMailLists[0].ref.update({
    //         active: true,
    //       })
    //     );
    //   }
    // }

    console.log({
      doc1: pendingMailListItemDocs[0]?.data(),
      doc2: pendingMailListItemDocs[1]?.data(),
    });

    // Mark pendingMailListItemDocs as sent
    promiseArr.push(
      ...pendingMailListItemDocs.map((doc) =>
        doc.ref.update({
          sent: true,
          sentOn: firestore.Timestamp.now(),
        })
      )
    );

    // Update lastSent in activeMailList
    promiseArr.push(
      activeMailList.ref.update({
        lastSent: firestore.Timestamp.now(),
      })
    );

    await Promise.all(promiseArr);
  } catch (error) {
    console.log("Error Occured. Aborting...");
    console.error(error);
    return;
  }
};

// export default sendMails;
sendMails();
