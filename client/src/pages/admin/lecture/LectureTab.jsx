import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'sonner'

const LectureTab = () => {
	const [title, setTitle] = useState("");
	const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
	const [isFree, setIsFree] = useState(false);
	const [mediaProgress, setMediaProgress] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [btnDisable, setBtnDisable] = useState(true);

	const MEDIA_API = "http://loacalhost:8080/api/v1/media";
	const fileChangeHandler = async (e) => {
		const file = e.target.files[0];
		if (file) {
			const formData = new FormData();
			formData.append("file", file);
			setMediaProgress(true);
			try {
				const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
					onUploadProgress: ({ loaded, total }) => {
						setUploadProgress(Math.round((loaded * 100) / total));
					}
				});
				if (res.data.success) {
					setUploadVideoInfo({ videoUrl: res.data.data.url, publicId: res.data.data.public_id });
					setBtnDisable(false);
					toast.success(res.data.message);
				}
			} catch (error) {
				console.log(error);
				toast.error("Video Upload failed");
			} finally {
				setMediaProgress(false);
			}
		}
	}

	return (
		<div>
			<Card>
				<CardHeader className="flex justify-between">
					<div>
						<CardTitle>Edit Lecture</CardTitle>
						<CardDescription>Make Changes and save when done.</CardDescription>
					</div>
					<div>
						<Button variant="destructive">Remove Lecture</Button>
					</div>
				</CardHeader>
				<CardContent>
					<div>
						<Label>Title</Label>
						<Input
							type="text"
							placeholder="e.g. Introduction to JS"
						/>
					</div>
					<div className='my-5'>
						<Label>Video <span className='text-red-500'>*</span></Label>
						<Input
							type="file"
							accept="video/*"
							placeholder="e.g. Introduction to JS"
							className="w-fit"
						/>
					</div>
					<div className='flex items-center space-x-2'>
						<Switch id="airplane-mode" />
						<Label htmlFor="airplane-mode">Is this video free?</Label>
					</div>
					{
						mediaProgress && (
							<div>
								
							</div>
						)
					}
					<div className='mt-4'>
						<Button>Update Lecture</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

export default LectureTab
