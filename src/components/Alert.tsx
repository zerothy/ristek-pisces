import React from 'react';

// TODO: BIKIN ALERT ATO PAKE TOASTER SONNER LIAT BESOK SEMPET APA ENGGA
export default function Alert(message: string, showAlert: boolean, setShowAlert: (showAlert: boolean) => void){
    return (
        <div className='w-16 h-10 bg-red-600'>
            <div>
                Alert
            </div>
        </div>
    );
}