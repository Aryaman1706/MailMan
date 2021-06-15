import { types as templateTypes } from "../template";

import getActiveMailList from "./utils/getActiveMailList";
import getUserSmtp from "./utils/getUserSmtp";
import isScheduledFunc from "./utils/isScheduled";
import getPendingMailListItems from "./utils/getPendingMailListItems";
import mailer from "./utils/mailer";
import handlePostProcessing from "./utils/handlePostProcessing";

const sendMails = async () => {
  try {
    const [activeMailList, activeMailLists, inactiveMailLists] =
      await getActiveMailList();

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
      console.log("No pendingMailListItems found for activeMailList.");

      // TODO
      // Update activeMailList to be complete
      await activeMailList.ref.update({
        active: false,
        complete: true,
      });
      console.log("Updating activeMailList to be complete.");

      // set activeMailList = inactiveMailLists[0]
      // find pendingMailListItems
      // make transfers in activeMailLists and inactiveMailLists

      console.log("Aborting...");
      return;
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

    await handlePostProcessing({
      activeMailList,
      pendingMailListItemDocs,
      inactiveMailLists,
    });
    console.log("All changes done. Function Completed.");
    return;
  } catch (error) {
    console.log("Error Occured.");
    console.error(error);
    console.log("Aborting...");
    return;
  }
};

export default sendMails;
