import React, { useCallback, useEffect, useState } from "react";
import {
  Box, FormControl, Button, InputLabel, TextField, CircularProgress, Select, ListSubheader, MenuItem, Avatar,
  SelectChangeEvent, Typography,
  InputAdornment,
} from "@mui/material";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";

import { ServiceRequestTable } from "src/components/tables/service-request-table";
import { AppDispatch, RootState } from "src/redux/store";
import { createContractSigned } from "src/redux/actions/contract.action";
import { providersCateFetch } from "src/redux/actions/searchSelect";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";
import { fetchAllServiceCategories } from "src/redux/actions";
import { organizerRequstToProvider } from "src/redux/actions/service-request";
import { organizerPlaceABid } from "src/redux/actions/organizer/place-a-bid.action";

interface FormData {
  serviceCategoryId: string;
  eventLocation: string;
  serviceTime: string;
  orgBudget: string;
  orgRequirement: string;
  orgAdditionalRequirement: string
}

interface ApiResult {
  status: number;
  type: string;
  message: any;
  // Add other properties if needed
}

export function PlaceABid({ _SelectedEvent }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state?.serviceReqCategories);
  const [wordCounts, setWordCounts] = useState({
    orgRequirement: 0,
    orgAdditionalRequirement: 0
  });
  const [errors, setErrors] = useState({
    orgRequirement: false,
    orgAdditionalRequirement: false
  });
  const [formData, setFormData] = React.useState<FormData>({
    serviceCategoryId: "",
    eventLocation: _SelectedEvent?.location || "", // Pre-fill with event location
    serviceTime: "",
    orgBudget: "",
    orgRequirement: "",
    orgAdditionalRequirement: ""
  });

  // Update formData when _SelectedEvent changes
  useEffect(() => {
    if (_SelectedEvent?.location) {
      setFormData(prev => ({
        ...prev,
        eventLocation: _SelectedEvent.location
      }));
    }
  }, [_SelectedEvent?.location]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const words = value.trim().split(/\s+/).filter(word => word.length > 0);
    const count = words.length;

    setWordCounts(prev => ({
      ...prev,
      [name]: count
    }));

    setErrors(prev => ({
      ...prev,
      [name]: count < 80
    }));

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleConfirm = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate word counts before submission
    if (wordCounts.orgRequirement < 80) {
      toast.error("Full Description must contain at least 80 words");
      return;
    }
    
    if (formData.orgAdditionalRequirement && wordCounts.orgAdditionalRequirement < 80) {
      toast.error("Additional Options must contain at least 80 words if provided");
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append("eventId", _SelectedEvent?._id);
    formDataObj.append("serviceCategoryId", formData.serviceCategoryId);
    formDataObj.append("serviceTime", formData.serviceTime);
    formDataObj.append("eventLocation", formData.eventLocation);
    formDataObj.append("orgBudget", formData.orgBudget.toString());
    formDataObj.append("orgRequirement", formData.orgRequirement);
    formDataObj.append("orgAdditionalRequirement", formData.orgAdditionalRequirement);
    
    try {
      const result = await dispatch(organizerPlaceABid(formDataObj)) as ApiResult;
      if (result?.status === 201) {
        toast.success("Requested Successfully...");
        setFormData({
          serviceCategoryId: "",
          eventLocation: _SelectedEvent?.location || "", // Reset to event location
          serviceTime: "",
          orgBudget: "",
          orgRequirement: "",
          orgAdditionalRequirement: ""
        });
        setWordCounts({
          orgRequirement: 0,
          orgAdditionalRequirement: 0
        });
      } else {
        toast.error(result?.message || "Service creation failed");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  }, [dispatch, formData, _SelectedEvent, wordCounts]);

  useEffect(() => {
    dispatch(fetchAllServiceCategories());
  }, [dispatch]);

  return (
    <Box
      sx={{
        p: 3,
        my: 3,
        borderRadius: 3,
        backgroundColor: "#fff",
        border: "1px solid #E0E0E0",
        boxShadow: 3,
      }}
    >
      <form onSubmit={handleConfirm}>
        <Box>
          <HeadingCommon variant="h6" title="Service Accepted Form" />
          <FormControl fullWidth>
            <InputLabel id="service-category-label">Type of Service Needed</InputLabel>
            <Select
              labelId="service-category-label"
              name="serviceCategoryId"
              value={formData.serviceCategoryId}
              onChange={handleSelectChange}
              required
              label="Type of Service Needed"
              renderValue={(selected) => {
                if (!categories) return 'Loading...';
                const selectedItem = categories
                  ?.flatMap((cat: any) => cat.subcategories || [])
                  ?.find((child: any) => child._id === selected);
                return selectedItem ? selectedItem.name : 'Select Category';
              }}
              disabled={!categories}
            >
              {!categories ? (
                <MenuItem disabled value="">
                  <Box display="flex" alignItems="center" justifyContent="center" width="100%">
                    <CircularProgress size={24} />
                    <Box ml={2}>Loading categories...</Box>
                  </Box>
                </MenuItem>
              ) : (
                categories?.map((parent: any) => (
                  parent.subcategories?.length > 0 && [
                    <ListSubheader key={`header-${parent._id}`}>{parent.name}</ListSubheader>,
                    ...parent.subcategories.map((child: any) => (
                      <MenuItem key={child._id} value={child._id}>
                        {child.name}
                      </MenuItem>
                    ))
                  ]
                ))
              )}
            </Select>
          </FormControl>

          <TextField
            required
            fullWidth
            label="Event Location"
            margin="normal"
            name="eventLocation"
            value={formData.eventLocation}
            onChange={handleChange}
            placeholder="Enter event location"
            helperText={
              <Typography variant="caption" color="textSecondary">
                Pre-filled with event location. You can modify it as needed.
              </Typography>
            }
          />

          <TextField
            required
            fullWidth
            label="Date and Time of the Service"
            type="datetime-local"
            margin="normal"
            name="serviceTime"
            value={formData.serviceTime}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            required
            fullWidth
            type="text"
            label="Estimated Budget"
            margin="normal"
            placeholder="e.g. 1500 - 2000"
            name="orgBudget"
            value={formData.orgBudget}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">XAF</InputAdornment>,
            }}
          />

          <TextField
            required
            fullWidth
            label="Full Description of Requirements"
            multiline
            rows={4}
            margin="normal"
            name="orgRequirement"
            value={formData.orgRequirement}
            onChange={handleTextChange}
            error={errors.orgRequirement}
            helperText={
              <Typography variant="caption" color={errors.orgRequirement ? "error" : "textSecondary"}>
                {wordCounts.orgRequirement} words (Minimum 80 words required)
              </Typography>
            }
          />

          <TextField
            fullWidth
            label="Additional Options"
            multiline
            rows={4}
            margin="normal"
            name="orgAdditionalRequirement"
            value={formData.orgAdditionalRequirement}
            onChange={handleTextChange}
            error={errors.orgAdditionalRequirement && formData.orgAdditionalRequirement.length > 0}
            helperText={
              formData.orgAdditionalRequirement.length > 0 ? (
                <Typography variant="caption" color={errors.orgAdditionalRequirement ? "error" : "textSecondary"}>
                  {wordCounts.orgAdditionalRequirement} words (Minimum 80 words required if provided)
                </Typography>
              ) : (
                <Typography variant="caption" color="textSecondary">
                  Optional - If provided, minimum 80 words required
                </Typography>
              )
            }
          />

          <Button
            variant="contained"
            size="small"
            type="submit"
            disabled={errors.orgRequirement ||
              (formData.orgAdditionalRequirement.length > 0 && errors.orgAdditionalRequirement)}
            sx={{
              backgroundColor: "#08043bff",
              color: 'white',
              width: "100%",
              mt: 2,
              p: 1,
              '&:disabled': {
                backgroundColor: '#f5f5f5',
                color: '#bdbdbd'
              }
            }}
          >
            Send Request
          </Button>
        </Box>
      </form>
    </Box>
  );
}