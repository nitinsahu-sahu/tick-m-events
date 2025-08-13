import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DashboardContent } from "src/layouts/dashboard";
import { PageTitleSection } from "src/components/page-title-section";
import { fatchOrgEvents } from "src/redux/actions/organizer/pageEvents";
import { EventBreadCrum } from "src/sections/entry-validation/event-status";
import { AppDispatch, RootState } from "src/redux/store";

import { EventCustomization } from "../event-page-customization";
import { VisibilityType } from "../visibility-type";
import { CustomPhotoVideoFilter } from "../custom-photo-video-filter";

interface EventVisibility {
  _id: string;
  eventId: string;
  visibilityType: 'public' | 'private' | 'unlisted';
  customUrl?: string;
  promotionAndHighlight: {
    homepageHighlighting: boolean;
    autoShareOnSocialMedia: boolean;
  };
  status: 'draft' | 'publish' | 'archived';
}

interface Event {
  _id: string;
  eventName: string;
  date: string;
  time: string;
  category: string;
  eventType: 'Public' | 'Private';
  visibility: EventVisibility;
  coverImage: {
    public_id: string;
    url: string;
  };
  portraitImage: {
    public_id: string;
    url: string;
  };
  customization: any
  // Add other properties as needed
}
export function VisibilityAndAccessSettingsView() {
  const { __events } = useSelector((state: RootState) => state.organizer);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
 
  useEffect(() => {
    dispatch(fatchOrgEvents());
  }, [dispatch]);

  const handleEventSelect = (event: Event | null) => {
    setSelectedEvent(event);
  };

  return (
    <DashboardContent>
      <EventBreadCrum events={__events} onEventSelect={handleEventSelect} />

      <PageTitleSection
        title="Visibility And Access Settings"
      />
      <VisibilityType eventId={selectedEvent?._id} visibility={selectedEvent?.visibility} />

      <EventCustomization eventId={selectedEvent?._id} />

      <CustomPhotoVideoFilter __events={selectedEvent} />

    </DashboardContent>
  )

}