import { Box, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface PostData {
    eventName: string;
    description: string;
    imageUrl: string;
    platform: string;
    hashtag: string;
    reservationLink: string;
}

export function SocialShare() {
    const { id } = useParams();
    const [post, setPost] = useState<PostData | null>(null);

    useEffect(() => {
        if (id) {
            axios.get(`/promotion/social-share/${id}`,{ responseType: 'text' })
                .then(res => {
                     const html = res.data;
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, "text/html");
                    const getMeta = (property: string) =>
                        doc.querySelector(`meta[property="${property}"]`)?.getAttribute("content") || "";

                    const postData = {
                        eventName: getMeta("og:title"),
                        description: getMeta("og:description"),
                        imageUrl: getMeta("og:image"),
                        reservationLink: doc.querySelector("script")?.textContent?.match(/window\.location\.href\s*=\s*'(.*?)'/)?.[1] || "",
                        platform: "Unknown",
                        hashtag: "#Event", // you can't get this from HTML unless added
                    };

                    setPost(postData);
                })
                .catch((err) => console.error("Failed to parse post data", err));

        }
    }, [id]);

    if (!post) return <Typography textAlign="center">Loading...</Typography>;

    return (
        <>
            <Helmet>
                <title>{post?.eventName || "Event Details"}</title>
                <meta property="og:title" content={post?.eventName || "Event Details"} />
                <meta property="og:description" content={post?.description} />
                <meta property="og:image" content={post?.imageUrl} />
                <meta property="og:url" content={`http://localhost:3039/post/${id}`} />
                <meta property="og:type" content="website" />
            </Helmet>

            <Box display="flex" justifyContent="center" mt={4}>
                <Card sx={{ maxWidth: 600 }}>
                    <CardMedia
                        component="img"
                        height="300"
                        image={post?.imageUrl}
                        alt="Event"
                    />
                    <CardContent>
                        <Typography variant="h6" color="text.secondary">
                            Platform: {post?.platform}
                        </Typography>
                        <Typography variant="body1" my={2}>
                            {post?.description}
                        </Typography>
                        <Typography variant="body2" color="primary">
                            {post?.hashtag}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            href={post?.reservationLink}
                            target="_blank"
                            sx={{ mt: 2 }}
                        >
                            Reserve Now
                        </Button>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}
