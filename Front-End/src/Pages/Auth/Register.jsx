import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const schema = yup
	.object()
	.shape({
		firstName: yup.string().trim().required('The input field is required'),
		email: yup
			.string()
			.email('Enter a valid email')
			.trim()
			.required('The input field is required'),
		password: yup
			.string()
			.trim()
			.required('The input field is required')
			.min(8, 'Minimun 8 caracters'),
		confirmPassword: yup
			.string()
			.trim()
			.required('The input field is required')
			.min(8, 'Minimum 8 caracteres')
			.oneOf([yup.ref('password'), null], 'password must match'),
	})
	.required();

const Register = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	// const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (data) => {
			return axios.post(`${import.meta.env.URL_API}/auth/register`, data);
		},

		onSuccess: () => {
			// invalidate and refetch
		},
	});

	const onSubmit = (data) => {
		mutation.mutate(data);
		reset();
	};

	return (
		<div className='flex min-h-screen items-center flex-1 justify-center px-6 lg:px-8'>
			<div className='mt-1 sm:mx-auto sm:w-full sm:max-w-sm'>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='space-y-1 shadow bg-indigo-50 px-8 py-6'
				>
					<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
						<h2 className='mb-5 text-left text-3xl font-bold leading-9 tracking-tight text-gray-900'>
							Register
						</h2>
					</div>
					<div>
						<label
							htmlFor='firstName'
							className='block text-sm font-medium leading-6 text-gray-900'
						>
							First Name
						</label>
						<div className='mt-2'>
							<input
								id='firstName'
								name='firstName'
								type='text'
								autoComplete='text'
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-1.5'
								{...register('firstName')}
							/>
							<p className='text-red-400 text-sm'>
								{errors.firstName?.message}
							</p>
						</div>
					</div>
					<div>
						<label
							htmlFor='email'
							className='block text-sm font-medium leading-6 text-gray-900'
						>
							Email address
						</label>
						<div className='mt-2'>
							<input
								id='email'
								name='email'
								type='email'
								autoComplete='email'
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-1.5'
								{...register('email')}
							/>
							<p className='text-red-400 text-sm'>{errors.email?.message}</p>
						</div>
					</div>

					<div>
						<div className='flex items-center justify-between'>
							<label
								htmlFor='password'
								className='block text-sm font-medium leading-6 text-gray-900'
							>
								Password
							</label>
						</div>
						<div className='mt-2'>
							<input
								id='password'
								name='password'
								type='password'
								autoComplete='current-password'
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-1.5'
								{...register('password')}
							/>
							<p className='text-red-500 text-sm'>{errors.password?.message}</p>
						</div>
					</div>
					<div>
						<div className='flex items-center justify-between'>
							<label
								htmlFor='confirmPassword'
								className='block text-sm font-medium leading-6 text-gray-900'
							>
								Confirm Password
							</label>
						</div>
						<div className='mt-2'>
							<input
								id='confirmPassword'
								name='confirmPassword'
								type='password'
								autoComplete='current-password'
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-1.5'
								{...register('confirmPassword')}
							/>

							<p className='text-red-600 text-sm'>
								{errors.confirmPassword?.message}
							</p>
						</div>
					</div>

					<div>
						<button
							type='submit'
							className='flex mt-5 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							Register
						</button>
					</div>

					<p className=' mt-4'>
						Already Have an account?
						<Link to='/login' className='text-blue-500 font-semibold mx-2'>
							Login
						</Link>
						there!!
					</p>
				</form>
			</div>
		</div>
	);
};
export default Register;
