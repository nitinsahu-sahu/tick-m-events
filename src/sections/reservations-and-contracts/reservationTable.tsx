// src/components/reservations-table/reservations-table.tsx
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Button,
  Box,
  Typography,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { Close, Visibility } from "@mui/icons-material";

interface Project {
  _id: string;
  projectId?: {
    _id: string;
    eventId: {
      eventName: string;
      date: string;
      location: string;
    };
    categoryId: {
      name: string;
    };
    serviceTime: string;
    orgBudget: string;
  };
  eventId?: {
    eventName: string;
    date: string;
    location: string;
  };
  bidAmount?: number;
  winningBid?: number;
  organizrAmount?: number;
  status: string;
  projectType: "Bid" | "EventReq";
  projectStatus: "active" | "completed";
  createdAt: string;
}

interface ReservationsTableProps {
  projects: Project[];
  type: "active" | "completed";
}

export function ReservationsTable({ projects, type }: ReservationsTableProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedProject(null);
  };

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

    const formatCurrency = (amount: number) => `${amount?.toLocaleString()} XAF`;


  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "accepted":
        return "success";
      case "pending":
        return "warning";
      case "completed":
        return "primary";
      default:
        return "default";
    }
  };

  const tableHeaders = [
    "Event Name",
    "Category",
    "Service Date",
    "Budget",
    "Bid Amount",
    "Status",
    "Type",
    "Actions",
  ];

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="reservations table">
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              {tableHeaders.map((header) => (
                <TableCell key={header} sx={{ fontWeight: "bold" }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow
                key={project._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { backgroundColor: "#fafafa" },
                }}
              >
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">
                    {project.projectId?.eventId?.eventName || 
                     project.eventId?.eventName || 
                     "N/A"}
                  </Typography>
                </TableCell>
                <TableCell>
                  {project.projectId?.categoryId?.name || "N/A"}
                </TableCell>
                <TableCell>
                  {formatDate(
                    project.projectId?.serviceTime || 
                    project.createdAt
                  )}
                </TableCell>
                <TableCell>
                  {project.projectId?.orgBudget ? 
                    `${project.projectId.orgBudget} XAF` : 
                    formatCurrency(project.organizrAmount || 0)}
                </TableCell>
                <TableCell>
                  {project.bidAmount ? 
                    formatCurrency(project.bidAmount) : 
                    project.winningBid ? 
                    formatCurrency(project.winningBid) : 
                    "N/A"}
                </TableCell>
                <TableCell>
                  <Chip
                    label={project.status}
                    color={getStatusColor(project.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={project.projectType}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Visibility />}
                    onClick={() => handleViewDetails(project)}
                    sx={{
                      textTransform: "none",
                      borderColor: "#2295D4",
                      color: "#2295D4",
                      "&:hover": {
                        borderColor: "#1976d2",
                        backgroundColor: "rgba(34, 149, 212, 0.04)",
                      },
                    }}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {projects.length === 0 && (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" color="textSecondary">
              No {type} projects found
            </Typography>
          </Box>
        )}
      </TableContainer>

      {/* Project Details Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          backgroundColor: "#2295D4",
          color: "white"
        }}>
          Project Details
          <IconButton onClick={handleCloseDialog} sx={{ color: "white" }}>
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ mt: 2 }}>
          {selectedProject && (
            <Box sx={{ p: 1 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Event Name
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {selectedProject.projectId?.eventId?.eventName || 
                     selectedProject.eventId?.eventName || 
                     "N/A"}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Project Type
                  </Typography>
                  <Chip
                    label={selectedProject.projectType}
                    color="primary"
                    size="small"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Category
                  </Typography>
                  <Typography variant="body1">
                    {selectedProject.projectId?.categoryId?.name || "N/A"}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Status
                  </Typography>
                  <Chip
                    label={selectedProject.status}
                    color={getStatusColor(selectedProject.status)}
                    size="small"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Service Date
                  </Typography>
                  <Typography variant="body1">
                    {formatDate(
                      selectedProject.projectId?.serviceTime || 
                      selectedProject.createdAt
                    )}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Location
                  </Typography>
                  <Typography variant="body1">
                    {selectedProject.projectId?.eventId?.location || 
                     selectedProject.eventId?.location || 
                     "N/A"}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Budget
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {selectedProject.projectId?.orgBudget ? 
                      `${selectedProject.projectId.orgBudget} XAF` : 
                      formatCurrency(selectedProject.organizrAmount || 0)}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    {selectedProject.bidAmount ? "Bid Amount" : "Winning Bid"}
                  </Typography>
                  <Typography variant="body1" fontWeight="medium" color="#2295D4">
                    {selectedProject.bidAmount ? 
                      formatCurrency(selectedProject.bidAmount) : 
                      selectedProject.winningBid ? 
                      formatCurrency(selectedProject.winningBid) : 
                      "N/A"}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Created Date
                  </Typography>
                  <Typography variant="body1">
                    {formatDate(selectedProject.createdAt)}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Project Status
                  </Typography>
                  <Chip
                    label={selectedProject.projectStatus}
                    color={selectedProject.projectStatus === "active" ? "success" : "primary"}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={handleCloseDialog} 
            variant="contained"
            sx={{
              backgroundColor: "#2295D4",
              "&:hover": {
                backgroundColor: "#1976d2",
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}