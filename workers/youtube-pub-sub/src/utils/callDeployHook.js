const callDeployHook = async (env) => {
    if (!env.DEPLOY_HOOK_URL) {
        console.error('DEPLOY_HOOK_URL is not set');
        return new Response('Internal Server Error', { status: 500 });
    }
    
    const hookResponse = await fetch(env.DEPLOY_HOOK_URL, {
        method: 'POST',
    });
      
    if (!hookResponse.ok) {
        console.error(`Deploy hook returned status ${hookResponse.status}`);
    } else {
        console.log('Deploy hook called successfully');
    }
      
    return new Response('OK', { status: 200 });
}

export { callDeployHook };