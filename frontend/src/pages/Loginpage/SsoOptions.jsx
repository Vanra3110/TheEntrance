import React from 'react';
import Button from '../../components/Button';

const SsoOptions = () => {
    return (
        <>
            <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-outline-variant"></div>
                <span className="flex-shrink mx-4 font-label-sm text-label-sm text-on-surface-variant">OR MORE</span>
                <div className="flex-grow border-t border-outline-variant"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Button 
                    className="w-full flex flex-row-reverse items-center justify-center h-12 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors font-label-sm text-label-sm text-on-surface gap-2" 
                    type="button" 
                    icon="g_mobiledata_badge" 
                    text="Google" 
                    textClassName="text-[15px]" 
                />
                <Button 
                    className="w-full flex flex-row-reverse items-center justify-center h-12 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors font-label-sm text-label-sm text-on-surface gap-2" 
                    type="button" 
                    icon="hub" 
                    text="Github" 
                    textClassName="text-[15px]" 
                />
            </div>
        </>
    );
};

export default SsoOptions;
