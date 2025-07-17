import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageTitleSection } from 'src/components/page-title-section';
import { DashboardContent } from 'src/layouts/dashboard';
import { editEventsFetch } from 'src/redux/actions/editEventAction';
import { AppDispatch, RootState } from 'src/redux/store';

export function EditEventsView() {
    const { eventsLists } = useSelector((state: RootState) => state.editEvent);
  
  console.log(eventsLists);
  
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(editEventsFetch())
  }, [dispatch])

  return (
    <DashboardContent>
      <PageTitleSection title="Events Edits" />


      <Typography>Edit Evets</Typography>

    </DashboardContent>
  );
}
