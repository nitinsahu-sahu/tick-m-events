import { Tab, Tabs } from "@mui/material";

export function TabButton({  tabValue, onChange, tabLabels }: any) {

    return (
        <Tabs
            value={tabValue}
            onChange={onChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            TabIndicatorProps={{ style: { display: "none" } }}
            textColor="inherit"
            sx={{
                "& .MuiTabs-scroller": {
                    overflow: "auto !important",
                }
            }}
        >
            {tabLabels.map((label: any, index: any) => (
                <Tab
                    key={index}
                    label={label}
                    sx={{
                        px: { xs: 1, sm: 3 },
                        margin: "0px 5px ",
                        minWidth: "unset",
                        textTransform: "none",
                        borderRadius: 2,
                        border: "1px solid #0B2E4C",
                        backgroundColor: tabValue === index ? "#0B2E4C" : "white",
                        fontWeight: tabValue === index ? "bold" : "normal",
                        color: tabValue === index ? "white" : "black",
                        fontSize: { xs: "0.75rem", sm: "0.875rem" }
                    }}
                />
            ))}
        </Tabs>
    )
}