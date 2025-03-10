import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from '@/features/api/courseApi'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const LectureTab = () => {
	const [lectureTitle, setLectureTitle] = useState("");
	const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
	const [isFree, setIsFree] = useState(false);
	const [mediaProgress, setMediaProgress] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [btnDisable, setBtnDisable] = useState(true);
	const params = useParams();
	const { courseId, lectureId } = params;
	console.log(courseId);
	console.log(lectureId);


	const { data: lectureData } = useGetLectureByIdQuery(lectureId);
	const lecture = lectureData?.lecture;

	useEffect(() => {
		if (lecture && lectureId) {
			setLectureTitle(lecture.lectureTitle);
			setIsFree(lecture.isPreviewFree);
			setUploadVideoInfo(lecture.videoInfo);
		}
	}, [lecture, lectureId])
	const [editLecture, { data, isLoading, error, isSuccess }] = useEditLectureMutation();
	const [removeLecture, { data: removeData, isLoading: removeLoading, isSuccess: removeSuccess, error: removeError }] = useRemoveLectureMutation();

	const MEDIA_API = "http://localhost:8080/api/v1/media";
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
	console.log(uploadVideoInfo);
	
	const editLectureHandler = async () => {
		await editLecture({
			lectureTitle,
			videoInfo: uploadVideoInfo,
			isPreviewFree: isFree,
			courseId,
			lectureId
		});
	}
	const navigate = useNavigate();
	useEffect(() => {
		if (isSuccess) {
			toast.success(data?.message);
			navigate(-1);
		}
		if (error) {
			toast.error(error.data.message);
		}
	}, [data, isSuccess, error])

	const removeLectureHandler = async () => {
		await removeLecture({lectureId});
	}
	useEffect(() => {
		if (removeSuccess) {
			toast.success(removeData?.message);
			navigate(-1);
		}
		if (removeError) {
			toast.error(removeError.data.message);
		}
	}, [removeData, removeSuccess, removeError])
	return (
		<div>
			<Card>
				<CardHeader className="flex justify-between">
					<div>
						<CardTitle>Edit Lecture</CardTitle>
						<CardDescription>Make Changes and save when done.</CardDescription>
					</div>
					<div>
						<Button disabled={removeLoading} variant="destructive" onClick={removeLectureHandler}>
							{
								removeLoading ? (
									<>
										<Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait
									</>
								) : (
									"Remove Lecture"
								)
							}
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<div>
						<Label>Title</Label>
						<Input
							type="text"
							placeholder="e.g. Introduction to JS"
							value={lectureTitle}
							onChange={(e) => setLectureTitle(e.target.value)}
						/>
					</div>
					<div className='my-5'>
						<Label>Video <span className='text-red-500'>*</span></Label>
						<Input
							type="file"
							accept="video/*"
							onChange={fileChangeHandler}
							placeholder="e.g. Introduction to JS"
							className="w-fit"
						/>
					</div>
					<div className='flex items-center space-x-2'>
						<Switch
							checked={isFree} onCheckedChange={setIsFree} id="airplane-mode" />
						<Label htmlFor="airplane-mode">Is this video free?</Label>
					</div>
					{
						mediaProgress && (
							<div className='my-4'>
								<Progress value={uploadProgress} />
								<p>{uploadProgress}% uploaded</p>

							</div>
						)
					}
					<div className='mt-4'>
						<Button disabled={isLoading} onClick={editLectureHandler}>
							{
								isLoading ? (
									<>
										<Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait
									</>
								) : (
									"Update Lecture"
								)
							}
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

export default LectureTab
