import { PageTitleSection } from "src/components/page-title-section";
import { DashboardContent } from "src/layouts/dashboard";
import { CustomPhotoVideoFilter } from "../custom-photo-video-filter";
import { EventCustomization } from "../event-page-customization";
import { NotificationAutomaticReminders } from "../notifications-&-automatic-reminders";
import { VisibilityType } from "../visibility-type";

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