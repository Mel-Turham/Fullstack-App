import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';

const schema = yup
	.object()
	.shape({
		email: yup
			.string()
			.email('Enter the valid email')
			.required('Please provide your email there'),
		password: yup
			.string()
			.min(8, 'Provide 8 characters for the password')
			.required('please provide your password there'),
	})
	.required();

const Login = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = (data) => {
		console.log(data);
		reset();
	};

	return (
		<div className='flex min-h-screen flex-1 flex-col justify-center px-6 lg:px-8 bg-gradient-to-tr to-indigo-50 from-indigo-100'>
			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='space-y-2 bg-indigo-200 py-6 px-8 rounded-md shadow-sm'
				>
					<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
						<h2 className='text-left mb-4 text-3xl font-bold leading-9 tracking-tight text-gray-900'>
							Login
						</h2>
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
						</div>
						<p className='text-red-500'>{errors.email?.message}</p>
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
						</div>
						<p className='text-red-500'>{errors.password?.message}</p>
					</div>

					<div>
						<button
							type='submit'
							className='flex w-full justify-center rounded-md bg-indigo-600 mt-6 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							Login
						</button>
					</div>
					<p className='mt-2'>
						You don&rsquo;t have an account
						<Link
							to='/register'
							className='mx-2 mt-2 font-semibold text-blue-500'
						>
							Register
						</Link>
						there!!
					</p>
				</form>
			</div>
		</div>
	);
};
export default Login;
