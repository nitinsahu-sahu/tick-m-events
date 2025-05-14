import { DashboardContent } from "src/layouts/dashboard";

import { PageTitleSection } from "src/components/page-title-section";

import { EventCustomization } from "../event-page-customization";
import { VisibilityType } from "../visibility-type";
import { CustomPhotoVideoFilter } from "../custom-photo-video-filter";
import { NotificationAutomaticReminders } from "../notifications-&-automatic-reminders";

export function VisibilityAndAccessSettingsView() {
  return (
    <DashboardContent>
      <PageTitleSection
        title="Visibility And Access Settings"
      />
      <VisibilityType />
      <NotificationAutomaticReminders />
      
      <EventCustomization />

      <CustomPhotoVideoFilter />

    </DashboardContent>
  )

}