import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { eventByIdFetch } from 'src/redux/actions/event.action';
import { AppDispatch, RootState } from 'src/redux/store';

import { FrontHome } from 'src/sections/front-home/view';

// ----------------------------------------------------------------------

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const { eventId } = useParams();
  const { _id, eventName, coverImage, description
  } = useSelector((state: RootState) => state?.event?.eventWithDetails);
  useEffect(() => {
    const fetchEvent = async () => {
      await dispatch(eventByIdFetch(eventId));
    };
    fetchEvent();
  }, [dispatch, eventId]);
  return (
    <>
      <Helmet>
        <title> {`Event - ${CONFIG.appName}`}</title>
        <meta property="og:title" content={eventName} />
        <meta property="og:description" content={description?.replace(/<[^>]*>/g, '').substring(0, 160)} />
        <meta property="og:image" content={coverImage?.url} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={`${import.meta.env.VITE_Live_URL||'https://tick-m-events.vercel.app'}/our-event/${_id}`} />
        <meta property="og:type" content="website" />

        {/* Twitter Card tags (optional but recommended) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={eventName} />
        <meta name="twitter:description" content={description?.replace(/<[^>]*>/g, '').substring(0, 160)} />
        <meta name="twitter:image" content={coverImage?.url} />
      </Helmet>

      <FrontHome />
    </>
  );
}
