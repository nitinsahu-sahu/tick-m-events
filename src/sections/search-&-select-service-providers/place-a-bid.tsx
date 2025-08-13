import React, { useCallback, useEffect } from "react";
import {
  Box, FormControl, Button, InputLabel, TextField, CircularProgress, Select, ListSubheader, MenuItem, Avatar,
  SelectChangeEvent,
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

interface FormData {
  serviceCategoryId: string;
  eventLocation: string;
  serviceTime: string;
  orgBudget: number;
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

  const [formData, setFormData] = React.useState<FormData>({
    serviceCategoryId: "",
    eventLocation: "",
    serviceTime: "",
    orgBudget: 0,
    orgRequirement: "",
    orgAdditionalRequirement: ""
  });



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const { name, value } = e.target;

    // Special handling for orgBudget
    if (name === 'orgBudget') {
      // If the input is empty, set to empty string (will be converted to 0 in state)
      // Or you can set to 0 directly if you prefer
      const numericValue = value === '' ? '' : Number(value);
      setFormData((prev: any) => ({
        ...prev,
        [name]: numericValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
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
    const formDataObj = new FormData();
    formDataObj.append("eventId", _SelectedEvent?._id);
    formDataObj.append("status", 'requested-by-organizer');
    formDataObj.append("serviceCategoryId", formData.serviceCategoryId);
    formDataObj.append("serviceTime", formData.serviceTime);
    formDataObj.append("eventLocation", formData.eventLocation);
    formDataObj.append("orgBudget", formData.orgBudget.toString());
    formDataObj.append("orgRequirement", formData.orgRequirement);
    formDataObj.append("orgAdditionalRequirement", formData.orgAdditionalRequirement);
    try {
      const result = await dispatch(organizerRequstToProvider(formDataObj)) as ApiResult;
      if (result?.status === 201) {
        toast.success("Requested Successfully...");
        setFormData({
          serviceCategoryId: "",
          eventLocation: "",
          serviceTime: "",
          orgBudget: 0,
          orgRequirement: "",
          orgAdditionalRequirement: ""
        })
      } else {
        toast.error(result?.message || "Service creation failed");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  }, [dispatch, formData, _SelectedEvent])

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
              disabled={!categories} // Disable while loading
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
            type="number"
            label="Estimated Budget"
            margin="normal"
            name="orgBudget"
           value={formData.orgBudget === 0 ? '' : formData.orgBudget} 
            onChange={handleChange}
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
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Additional Options"
            multiline
            rows={4}
            margin="normal"
            name="orgAdditionalRequirement"
            value={formData.orgAdditionalRequirement}
            onChange={handleChange}
          />

          <Button
            variant="contained"
            size="small"
            type="submit"
            sx={{
              backgroundColor: "#08043bff",
              color: 'white',
              width: "100%",
              mt: 2,
              p: 1
            }}
          >
            Send Request
          </Button>
        </Box>
      </form>
    </Box>
  );
}