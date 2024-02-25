export default function Logo() {
    const handleClick = () => {
        console.log('clicked'); //TODO: Add link to home page
    }

    return (
        <div className='w-12 p-2 cursor-pointer' onClick={handleClick}>
            <img src='/images/Logo.png' alt='Pisces Logo' draggable='false' />
        </div>
    );
}