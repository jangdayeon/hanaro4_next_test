export default function Login() {

  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:w-10/12 md:w-8/12 lg:w-2/5 p-6 shadow shadow-blue-400'>
      <h1 className='text-2xl font-bold'> 로그인 </h1>
      <form className="text-left py-11">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-bold">이메일</label>
          <input type="text" id="email"
                 className="border border-gray-300 rounded-mz"
                 placeholder="your email@example.com" />
          <label htmlFor="pw" className="font-bold">비밀번호</label>
          <input type="password" id="pw"
                 className="border border-gray-300 rounded-mz"
                 placeholder="비밀번호를 입력하세요" />
        </div>

      </form>
    </div>
  );
}
