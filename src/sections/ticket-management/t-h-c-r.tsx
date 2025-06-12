import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';

interface Props {
  items: any;
  index: number;
  type: string;
  onDownloadInvoice?: () => void;
  onCancel?: () => void;
}

export function TicketHistoryCancelRefundCard({
  items,
  index,
  type,
  onDownloadInvoice,
  onCancel,
}: Props) {
  return (
    <Grid item xs={12} key={index}>
      <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h6"
            fontWeight={500}
            sx={{ fontSize: { xs: '16px', sm: '20px', md: '24px' } }}
          >
            {items?.title}
          </Typography>
          <Typography
            variant="body2"
            fontWeight={500}
            sx={{ fontSize: { xs: '12px', sm: '14px', md: '16px' } }}
            color="textSecondary"
            gutterBottom
          >
            {items?.date} - {items?.type}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: items?.statusColor,
              fontWeight: '700',
              fontSize: { xs: '12px', sm: '14px', md: '16px' },
            }}
          >
            {items?.status}
          </Typography>

          <Box mt={2} display="flex" gap={2} flexWrap="wrap">
            {items?.button?.map((btnText: string) => {
              const isCancel = btnText === 'Cancel Request';
              const isInvoice = btnText === 'Download Invoice';

              return (
                <Button
                  key={btnText}
                  variant="contained"
                  sx={{
                    backgroundColor: isCancel ? '#d32f2f' : '#0B2E4C',
                    fontSize: { xs: '12px', sm: '14px', md: '16px' },
                    whiteSpace: 'nowrap',
                  }}
                  onClick={
                    isCancel
                      ? onCancel
                      : isInvoice
                      ? onDownloadInvoice
                      : undefined
                  }
                >
                  {btnText}
                </Button>
              );
            })}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
