import { DashboardContent } from "src/layouts/dashboard";

import { PageTitleSection } from "src/components/page-title-section";

import { EventCustomization } from "../event-page-customization";
import { VisibilityType } from "../visibility-type";
import { CustomPhotoVideoFilter } from "../custom-photo-video-filter";

export function VisibilityAndAccessSettingsView() {
  return (
    <DashboardContent>
      <PageTitleSection
        title="Visibility And Access Settings"
      />
      <VisibilityType />
      
      <EventCustomization />

      <CustomPhotoVideoFilter />

    </DashboardContent>
  )

}